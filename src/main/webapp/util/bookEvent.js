function BookEvent() {



    // this.createBookPromise = function (bookName) {
    //     console.log("createBookPromise");
    //     $.ajax({
    //         type: "post",
    //         url: "/Editor_war_exploded/servlet/BookInfoServlet",
    //         data: {"createBookPromise":bookName},
    //         success: function (msg) {
    //             console.log("createBookPromise:success: "+msg);
    //         },
    //         error: function (msg) {
    //             alert("error: can't write to database");
    //         },
    //         complete: function () {
    //             alert("complete");
    //         },
    //
    //     });
    // }
    /*
    return a jsonObject, if success create, obj['success'] =>bookname,else null
     */
    this.createBookPromise = function (bookName) {
        console.log("createBookPromise");
        return fetch('/Editor_war_exploded/servlet/BookInfoServlet',
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    // 'Accept': "application/json"
                },
                body: 'createBookPromise='+bookName
            }
        ).then(response=>{
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log("then1");
                return response.json();
            }
        }).catch(reason => console.log(reason))
        // $.ajax({
        //     type: "post",
        //     url: "/Editor_war_exploded/servlet/BookInfoServlet",
        //     data: {"createBookPromise": bookName},
        //     success: function (msg) {
        //         console.log("createBookPromise:success: " + msg);
        //     },
        //     error: function (msg) {
        //         alert("error: can't write to database");
        //     },
        //     complete: function () {
        //         alert("complete");
        //     },
        //
        // });
    }

    /*
    return system books info in type:JsonObject
     */
    this.openBookPromise = function (bookName='__CURRENT_BOOK__') {
        // this.Ele = $(container_div_id);
        // this.book = new Map();
        console.log("openBookPromise:"+bookName);

        return fetch('/Editor_war_exploded/servlet/BookInfoServlet',
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    // 'Accept': "application/json"
                },
                body: 'openBookPromise='+bookName
            }
        ).then(response=>{
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log("then1");
                return response.json();
            }
        })
    }

}

//模拟打开笔记本事件，我们测试的时候可以直接用这个使得我们直接处于一定的笔记本下。
// function test() {
//     var a = new Book('#editor');
//     a.openBookPromise();
// }

