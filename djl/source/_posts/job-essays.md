---
title: 工作随笔
date: 2017-05-27 11:09:56
tags: questions
categories: work
---
工作时遇到的问题，随手记录下来。可能比较散乱
<!--- more ---->

1. 使用hexo作为搭建博客，文章添加多标签时格式如下：

        tags：
        - 标签一
        - 标签二

2. 在新的页面使用post方式提交

        postFn(url, params) {
            let temp = document.createElement("form");
            temp.action = url;
            temp.target = '_blank'; // 在新窗口打开
            temp.method = "post";
            temp.style.display = "none";
            for (let x in params) {
                let opt = document.createElement("input");
                opt.name = x;
                opt.value = params[x];
                temp.appendChild(opt);
            }
            document.body.appendChild(temp);
            temp.submit();
            return temp;
        }

        postFn(url,{xx:xxx});

3. 获取cookie的值

        function getCookie(name){
            let arr,
                reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }

4. Ueditor 自定义dialog

    若要在自定义的html使用ajax请求，并且要获得请求返回的数据，记得一定要使用同步。

5. ueditor第二次打开无法渲染
    * 在页面或窗口关闭的时候，通过监听页面或窗口事件，在函数里面销毁富编辑器

            if(typeof(UE.getEditor("newsContentAdd")) !='undefined'){
             UE.getEditor("newsContentAdd").destroy();
            }

    * 在页面每次初始化的时候，先删除掉以前的编辑器，再次进行初始化

            //先删除掉以前的ueditor，否则第二次打开的时候会渲染失败
            UE.delEditor("newsContent");
            //初始化渲染ueditor
            var newsContent = UE.getEditor('newsContent',{
            initialFrameWidth:1000,initialFrameHeight:450,
            toolbars:[
              ['source','undo','redo','bold','italic','underline','fontborder','strikethrough','superscript','subscript', 'removeformat','formatmatch','autotypeset','blockquote','pasteplain','|','forecolor','backcolor','insertorderedlist','insertunorderedlist','selectall','cleardoc','rowspacingtop','rowspacingbottom','lineheight','|','background'],
              ['fontfamily','fontsize','|','justifyleft','justifycenter','justifyright','justifyjustify','|','imagenone','imageleft','imageright','imagecenter','|','insertimage','emotion','|','inserttable','deletetable','insertparagraphbeforetable','insertrow','deleterow','insertcol','deletecol','mergecells','mergeright','mergedown','splittocells','splittorows','splittocols','|','preview']
             ]
            ,emotionLocalization:true
            ,wordCount:false,autoFloatEnabled:false
            });

6. 一行显示不完则省略以及多行显示

        .oneline{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .muti{
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3; // 3行显示
            -webkit-box-orient: vertical;
        }


7.解决长串英文换行问题

        .line{
            overflow：hidden;
            word-wrap: break-word;
        }

8.绝对定位垂直居中

    .vertical{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%, -50%);
    }

9.box-shadow 效果

    .div {
        width: 200px;
        height: 200px;
        border-radius: 200px;
        box-shadow: 140px 0 rgba(70, 211, 58,  0.2) inset, // x/y轴的阴影是div宽/高的70%
                0 140px rgba(70, 211, 58,  0.2) inset,
                -140px 0 rgba(70, 211, 58,  0.2) inset,
                0 -140px rgba(70, 211, 58,  0.2) inset;
                -webkit-transition: box-shadow 0.75s;
    }

    .div:hover {
        box-shadow:
            8px 0 rgba(70, 211, 58, 0.5) inset,
            0 8px rgba(70, 211, 58, 0.5) inset,
            -8px 0 rgba(250, 238, 13,0.5) inset,
            0 -8px rgba(250, 238, 13,0.5) inset;
            -webkit-transition: box-shadow 0.75s;
    }

10.表格单元格中插入图片。清除间隙

    img{
        outline-width: 0;
        vertical-align: top;
    }

    //html代码
    <table>
        <tr>
            <td>
                <img src="https://cdn11.bookln.cn/218875_4A47FFB48FA28006198D9E329A318DEA.jpg" alt="">
            </td>
        </tr>
        <tr>
            <td>
                <img src="https://cdn11.bookln.cn/218875_BD88C825C626094507E549ED2FD6E1E1.jpg" alt="">
            </td>
        </tr>
    </table>

对比设置前后的效果
![alt text](https://cdn11.bookln.cn/218875_2F1487E5704A71A4EE2B94F4C07150FB.png)
![alt text](https://cdn11.bookln.cn/218875_F4A2F3B5B1CE75429038F7C90DD0FDDF.png)