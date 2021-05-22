<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="/Editor_war_exploded/quill/dist/quill.js"></script>

<%--    <script src="/Editor_war_exploded/quill-delta/lib/delta.js"></script>--%>
    <%--    tooltip--%>
    <link href="/Editor_war_exploded/quill/dist/quill.bubble.css" rel="stylesheet">
    <%--        toolbar--%>
<%--    <link href="/Editor_war_exploded/quill/quill.snow.css" rel="stylesheet">--%>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<%--    <script src="../quill-delta/lib/delta.js"></script>--%>




</head>
<body>

<div id="editor">
    <p>Hello World!</p>
    <p>Some initial <strong>bold</strong> text</p>
    <p><br></p>
</div>
<script >
    // import Delta from '/Editor_war_exploded/quill/node_modules/quill-delta/lib/delta.js'
    var Delta= Quill.import("delta");
    var a = new Delta().retain(12)
        .delete(4)
        .insert('White', { color: '#fff' });
    a.insert('wwwwww');
    console.log(a.length())

</script>
<script>
    // alert("test");
    const toolbarOptions = ['bold', 'italic', 'underline', 'link',{ 'header': '3' }];
    var quill = new Quill('#editor', {
        modules: { toolbar: toolbarOptions},
        theme: 'bubble'
    });
    const delta = {  "ops": [

            { "insert": "sb " },
            { "insert": "World", "attributes": { "bold": true } },
            { "insert": "\n" } ]
    }
    const de = {  "ops": [

            { "insert": "sb " },
            { "insert": "World", "attributes": { "bold": true } },
            { "insert": "\n" },
            { "insert": "World", "attributes": { "bold": true } }]
    }

    var cp = Quill.import("delta");
    var result = new cp(delta);
    var ch = new cp(de);
    var hhh = result.diff(ch);
    console.log(hhh);

    // console.log(quill.getContents(0));
    // console.log(quill.editor.getDelta());
    // console.log(quill);
    // // var a =quill.editor.getText(0,10);
    // var a =0;
    // console.log(a)
</script>

<div>
    <form action="/Editor_war_exploded/SaveServlet" method="post">
        <input id="del" name="del" value="abc"/>
        <input type="submit" value="submit"/>
    </form>
</div>
<script>
    var del = document.getElementById("del");
    del.value=JSON.stringify(quill.getContents(0));
    console.log(del.value);

</script>

<input type="button" name="sb" id="sb" value="sb"/>
<p id="abc">abcdefg</p>
<script>
    const dc = {  "ops": [

            { "insert": "sb " },
            { "insert": "World", "attributes": { "bold": true } },
            { "insert": "\n" } ]
    }

    var db = JSON.stringify(quill.getContents(0));
   var a = $("#sb");
    a.attr("value","hig");
    // alert(a);
    //a.value="bacd";
    // var b=a.getAttribute("value");
    // alert(b);
    $("#sb").click(function () {
        $.ajax({
            type: "post",
            url: "/Editor_war_exploded/servlet.SaveServlet",
            data: {"del":db},
            success: function (msg) {
                alert("succes");
            },
            error: function (msg) {
                alert("error");
            },
            complete: function () {
            },

        });
    })

</script>

</body>
</html>



