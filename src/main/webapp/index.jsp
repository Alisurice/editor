<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <script src="http_code.jquery.com_jquery-3.3.1.js"></script>
    <script src="./quill/dist/quill.js"></script>

    <script src="./util/block.textBlock.js"></script>
    <script src="./util/book.bookEvent.js"></script>
    <script src="./util/focus-viewport.book.js"></script>
    <script src="./util/dcm.js"></script>

    <link href="./quill/dist/quill.snow.css" rel="stylesheet">
    <link href="utilcss/viewstruct.css" rel="stylesheet">
    <!--    <script src="https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.3/quill.js"></script>-->
    <!--    <link href="https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.3/quill.snow.css" rel="stylesheet">-->
    <style>
        *{
            font-family:"Microsoft YaHei";
            border: 2px solid black;
            width:50px;
            height: 50px;
        }
        #ele2{
            border: 4px solid black;
            /*position: absolute;*/
            top:0px;
            overflow: scroll ;
            position: relative;
        }
        #ele3{
            border: 4px solid black;
            /*position: absolute;*/

            overflow: scroll ;
            position: relative;
        }
        #ele{
            border: 4px solid black;
            position: relative;
            /*top:600px;*/
            overflow: scroll ;
        }
        #editor{

            width:500px;
            height: 500px;
            border: 1px solid red;
            overflow: scroll ;
            /*position: relative;*/
            /*overflow: hidden;*/
            /*z-index: 0;*/
        }
        #imgTool{
            display: none;
        }
        #createbook {
            background-color: rgba(169,169,169,0.1);
            color: rgba(0,0,0,0.2);
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 4px;
            padding: 5px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            position: fixed;
            bottom: 5px;
            right: 5px;
        }
        #createbook:active {
            background-color: rgba(169,169,169,0.5);
            color: rgba(0,0,0,0.5);
        }
        li {
            display: inline;
            float: left;
        }
        ul{
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>



<!-- 创建编辑器容器 -->
<input type="button" onclick="quill.history.undo()">
<div id="editor" style="size: 500px">

    <p>Some initial <strong>bold</strong> text</p>
    <p><br></p>
<%--    <div id="ele" style="width: 500px;height: 500px;">--%>
<%--        <ul>--%>
<%--            <li><div id="ele2" style="width: 50px;height: 100%;"></div></li>--%>
<%--            <li>--%>
<%--                <div id="ele3" style="width: 50px;height: 100%;"></div>--%>
<%--            </li>--%>
<%--        </ul>--%>

<%--    </div>--%>
    <div id="ele" style="width: 500px;height: 500px;">

        <div id="a2" style="size: 100px; display:inline;float: left"></div>
        <div id="a1" style="size: 100px; display:block;"></div>

        <div id="a4" style="size: 100px; display:inline;float: left"></div>
        <div id="a3" style="size: 100px; display:block;"></div>
    </div>
</div>
<div id="editor2" style="size: 100px">
    <p>Hello World!</p>
    <p> <strong>bold</strong> text</p>
    <p><br></p>
</div>

<div>
    <form action="/Editor_war_exploded/SaveServlet" method="post">
        <input id="del"/>
        <input type="submit" value="submit"/>
    </form>
</div>



<!-- 初始化Quill编辑器 -->
<script>



    // const toolbarOptions = ['bold', 'italic', 'underline', 'strike'];
    //
    // // Quill.import('attributors/style/size')
    // var quill = new Quill('#editor', {
    //     modules: {
    //         toolbar: true
    //     },
    //     theme: 'snow'
    // });
    // quill.setContents([
    //     { insert: 'Hello ' },
    //     { insert: 'World!', attributes: { bold: true } },
    //     { insert: '\n' }
    // ]);
    // quill.setSelection(0, 5);
    // var range = quill.getSelection();
    // quill.on('selection-change', function(delta, oldDelta, source) {
    //     if (source == 'api') {
    //         console.log("An API call triggered this change.");
    //     } else if (source == 'user') {
    //         console.log("A user action triggered this change.");
    //     }
    // });
    // var bo = a.import('')
    // Quill.r
    // 正常初始化

    let ele = document.getElementById('ele');
    ele.style.top=300+'px';

    ele.scrollTo(-30,-30);
</script>
</body>
</html>