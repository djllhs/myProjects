---
title: oss+hexo 博客部署
date: 2017-05-26 17:42:37
tags:
- service
- hexo
categories: service
---
oss对象存储用来搭建个人博客是我同事告诉我的，比较适合前端用，写点笔记。hexo部署到oss有一个注意的点就是oss不能使用相对路径进行访问（是用来存储的），比如访问a.com\b\并不会访问到其页面内容，需要在路径后面加上index.html.
<!--- more --->

1. 在hexo默认配置文件中找到permalink参数，在其后面加上index.html

        permalink: :year/:month/:day/:title/index.html
        // 此外，如果添加了标签云页面，那么要在主题的关于tag和category的文件中的路径里面加上index.html。
        // tag 的添加 在/node_modules/hexo/lib/plugins/helper/tagcloud.js文件中修改，大约在227行左右，a标签中添加index.html
        result.push(
          '<a href="' + self.url_for(tag.path) + 'index.html" style="' + style + '">' +
          (transform ? transform(tag.name) : tag.name) +
          '</a>'
        );
        // category的设置 在/node_modules/hexo/lib/plugins/helper/list_categories.js文件中修改
        //大约74行的位置 a标签中添加index.html
         result += '<a class="' + className + '-list-link' + (isCurrent ? ' current' : '') + '" href="' + self.url_for(cat.path) + suffix + 'index.html">';

         // 注意：行数是根据自身情况而定，只要找准a标签的位置即可。

2. 随意找个文件位置，创建文件oss_config.json

    + accessKeyId和accessKeySecret是在阿里云上生成的，鼠标移入个人的名称就会显示accesskeys的图标，点击，按照提示操作即可。没有就创建。将对应的accessKeyId和accessKeySecret填入对应的字段

    ![alt text](/images/1.png)

    + 从左侧导航中找到对象存储oss，点击进入概览，点击你的域名，进入Bucket概览页，找到下方的oss外网域名，复制到对应的字段ossDomain。鼠标移上去，点击显示的EndPoint。进入到访问域名和数据中心，找到你所在的地区，复制外网EndPoint到对应的字段endpoint

    ![alt text](/images/2.png)

    ![alt text](/images/3.png)

    ![alt text](/images/4.png)

    + bucketName即为你的Bucket概览的名字

    ![alt text](/images/5.png)

    + localDir的值为你的hexo博客的public的路径，如：E:/DJling resource/djl/public/
          {
          "accessKeyId": "",
          "accessKeySecret": "",
          "endpoint": "oss-cn-shanghai.aliyuncs.com",
          "bucketName": "djllhs",
          "ossDomain": "djllhs.oss-cn-shanghai.aliyuncs.com",
          "localDir": "E:/DJling resource/djl/public/"
          }

3. 创建cdn.py,cdn的官方文档，用来刷新的，可去查阅

        #!/usr/bin/python
        # -*- coding:utf-8 -*-

        import sys,os
        import urllib, urllib2
        import base64
        import hmac
        import hashlib
        from hashlib import sha1
        import time
        import uuid
        import json
        from optparse import OptionParser
        import ConfigParser
        import traceback
        import requests

        access_key_id = '';
        access_key_secret = '';
        cdn_server_address = 'https://cdn.aliyuncs.com'
        CONFIGFILE = os.getcwd() + '/aliyun.ini'
        CONFIGSECTION = 'Credentials'
        cmdlist = '''
        // 接口说明请参照pdf文档
        '''

        def percent_encode(str):
            res = urllib.quote(str.decode(sys.stdin.encoding).encode('utf8'), '')
            res = res.replace('+', '%20')
            res = res.replace('*', '%2A')
            res = res.replace('%7E', '~')
            return res

        def compute_signature(parameters, access_key_secret):
            sortedParameters = sorted(parameters.items(), key=lambda parameters: parameters[0])

            canonicalizedQueryString = ''
            for (k,v) in sortedParameters:
                canonicalizedQueryString += '&' + percent_encode(k) + '=' + percent_encode(v)

            stringToSign = 'GET&%2F&' + percent_encode(canonicalizedQueryString[1:])

            h = hmac.new(access_key_secret + "&", stringToSign, sha1)
            signature = base64.encodestring(h.digest()).strip()
            return signature

        def compose_url(user_params):
            timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

            parameters = { \
                    'Format'        : 'JSON', \
                    'Version'       : '2014-11-11', \
                    'AccessKeyId'   : access_key_id, \
                    'SignatureVersion'  : '1.0', \
                    'SignatureMethod'   : 'HMAC-SHA1', \
                    'SignatureNonce'    : str(uuid.uuid1()), \
                    'TimeStamp'         : timestamp, \
            }

            for key in user_params.keys():
                parameters[key] = user_params[key]

            signature = compute_signature(parameters, access_key_secret)
            parameters['Signature'] = signature
            url = cdn_server_address + "/?" + urllib.urlencode(parameters)
            return url

        def make_request(user_params, quiet=False):
            url = compose_url(user_params)
            r = requests.get(url)
            print(r.content)

        def configure_accesskeypair(args, options):
            if options.accesskeyid is None or options.accesskeysecret is None:
                print("config miss parameters, use --id=[accesskeyid] --secret=[accesskeysecret]")
                sys.exit(1)
            config = ConfigParser.RawConfigParser()
            config.add_section(CONFIGSECTION)
            config.set(CONFIGSECTION, 'accesskeyid', options.accesskeyid)
            config.set(CONFIGSECTION, 'accesskeysecret', options.accesskeysecret)
            cfgfile = open(CONFIGFILE, 'w+')
            config.write(cfgfile)
            cfgfile.close()

        def setup_credentials():
            config = ConfigParser.ConfigParser()
            try:
                config.read(CONFIGFILE)
                global access_key_id
                global access_key_secret
                access_key_id = config.get(CONFIGSECTION, 'accesskeyid')
                access_key_secret = config.get(CONFIGSECTION, 'accesskeysecret')
            except Exception, e:
                print traceback.format_exc()
                print("can't get access key pair, use config --id=[accesskeyid] --secret=[accesskeysecret] to setup")
                sys.exit(1)

        if __name__ == '__main__':
            parser = OptionParser("%s Action=action Param1=Value1 Param2=Value2\n" % sys.argv[0])
            parser.add_option("-i", "--id", dest="accesskeyid", help="specify access key id")
            parser.add_option("-s", "--secret", dest="accesskeysecret", help="specify access key secret")

            (options, args) = parser.parse_args()
            if len(args) < 1:
                parser.print_help()
                sys.exit(0)

            if args[0] == 'help':
                print cmdlist
                sys.exit(0)
            if args[0] != 'config':
                setup_credentials()
            else: #it's a configure id/secret command
                configure_accesskeypair(args, options)
                sys.exit(0)

            user_params = {}
            idx = 1
            if not sys.argv[1].lower().startswith('action='):
                user_params['action'] = sys.argv[1]
                idx = 2

            for arg in sys.argv[idx:]:
                try:
                    key, value = arg.split('=')
                    user_params[key.strip()] = value
                except ValueError, e:
                    print(e.read().strip())
                    raise SystemExit(e)
            make_request(user_params)

4. 创建配置文件aliyun.init

        [Credentials]
        accesskeyid = LTAIowA8PvCJxEA8
        accesskeysecret = 2bHXbmggon6ng6hJzLNaSkLKbIdzPe
5. 创建发布文件incremental_upload_to_aliyun_oss.py,这个代码就自己写了哈
6. 创建脚本publish.bat

        python incremental_upload_to_aliyun_oss.py

        python cdn.py Action=RefreshObjectCaches ObjectType=File ObjectPath=你的域名

        @pause

注意：必须安装Python哟
