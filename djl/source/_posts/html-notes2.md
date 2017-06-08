---
title: html head标签
date: 2017-06-02 16:55:35
tags: head标签
categories: html
---
html head标签的介绍
<!--- more --->

head标签是&lt;head&gt;元素的内容，head的内容不会在浏览器中显示，包含页面的一些元数据（描述数据的数据）。可在head元素添加的元素标签：&lt;title&gt;,&lt;style&gt;,&lt;meta&gt;&lt;link&gt;&lt;script&gt;,&lt;noscript&gt;and&lt;base&gt;
* &lt;title&gt;元素，
    + 定义了文档的标题，
    + 定义了浏览器工具栏的标题，
    + 当网页添加到收藏夹时显示在收藏夹中的标题，
    + 显示在搜索引擎结果页面的标题，

    不同于&lt;h1&gt;。前者是表示整个HTML文档大致内容的元数据（不是文档的内容），后者通常出现在页面中，用来标记页面内容的标题（故事的标题，新闻的标题等等）
* &lt;meta&gt;元素，描述了一些基本的元数据，通常用于指定网页的描述，关键词，文件的最后修改时间，作者和其他的元数据，元数据可以使用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词）或其他web服务。包含了name和content属性

      <meta name='keywords' content='HTML,CSS,JavaScript,XML,XHTML'> // 关键词
      <meta name='description' content='this is a page about html tags'> //描述
      <meta name='author' content='djllhs'> // 作者
      <meta http-equiv='refresh' content='30'> // 每30s刷新当前页面

* &lt;base&gt;元素，base标签描述了基本的链接地址/链接目标，可添加默认打开方式，该标签作为HTML文档中所有的链接标签的默认链接。

        <html>
        <head>
            <base target="_blank" />
        </head>

        <body>
            <a href="http://www.cnblogs.com">这个页面会在新窗口打开</a>
            <a href="http://justany.cnblogs.com">这个页面也会在新窗口打开</a>
        </body>
        </html>

* &lt;link&gt;元素，link标签定义了文档与外部资源之间的联系，通常链接到样式表
* &lt;style&gt;元素，style标签定义了HTML文档的样式引用地址，在sytle中可以写样式

        <head>
        <style type="text/css">
            body {background-color:yellow}
            p {color:blue}
        </style>
        </head>
* &lt;script&gt;元素，script标签用于加载脚本文件
