/*
data communicate module
 */

function DCM() {
    /*
    return a json list of block in book
     */
    this.reloadBookPromise = async function (book) {
        console.log("DCM:reloadBookPromise:");
        book.blockList = await this.reloadFromDbPromise(book.bookInfo);
        console.log("DCM:get block list");
        console.log(book.blockList);
        // let newBlock = document.getElementsByClassName('Book');
        // newBlock.parentNode.removeChild(newBlock);
        await drawBlockList(book);



    }

    /*
    draw blocklist and add block to focusViewport.divList,will change divlist
     */
    function drawBlockList(book) {
        console.log("drawBlockList:");
        for(let index in book.blockList){
            console.log("focusViewport.blockList[index]:");
            console.log(book.blockList[index]);
            book.divList.push(
                new TextBlock(book, book.blockList[index]));
        }

        console.log(book.divList);
    }
    this.reloadFromDbPromise =  async function (Book) {
        try{
            let response = await fetch('/Editor_war_exploded/servlet/ReloadServlet',
                {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        // 'Accept': "application/json"
                    },
                    body: JSON.stringify(Book)
                }
            )
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log("then1");
                return response.json();
            }
        }catch (e) {
            console.log(e);
        }
    }

    /*

     */
    this.persistContainerPromise =  async function (focusViewport,delta) {

        try {
            let response =
                await fetch('/Editor_war_exploded/servlet/SaveServlet',
                    {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/x-www-form-urlencoded",
                            // 'Accept': "application/json"
                        },
                        body: 'del='+JSON.stringify(delta) + '&bookInfo='+JSON.stringify(focusViewport.bookInfo)
                    }
                )
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log("persistContainerPromise then:");
                return response.text();
            }
        }catch (e) {
            console.log(e);
        }

    }
}