
let hasNewBlock = false;
function TextBlock(bookObj, blockInfo, blockAttr){
    this.Ele;
    this.nav;
    this.blockContainer;
    this.editor;
    this.quill;
    this.position = blockAttr.position;

    if(blockInfo == null && hasNewBlock){
        console.log("has been create new block");
        return false;
    }
    else {
        hasNewBlock = true;
    }


    initView(this,bookObj);
    // console.log("init view");
    // console.log(this);
    //set content
    if(blockInfo!=null&&blockInfo.delta != null){
        // console.log("initView:delta's type（must be a json object): "+typeof(blockInfo.delta));
        // console.log("if not a json ,please use JSON.parse(delta)");
        // console.log(blockInfo.delta);
        this.quill.setContents(JSON.parse(blockInfo.delta));
    }
    //delta == null ,则认为是onclick创建的block，不是reload事件中的block
    if(blockInfo == null){
        forNewBlockEvent(this,bookObj);
    }
    /*
       block未持久化前会触发的事件，这些事件会在persistContainer被触发时解绑
       专门用于onclick创建的block，数据库读取的block不应当调用该事件
    */
    function forNewBlockEvent(block, bookObj) {
        //block移动事件
        //使焦点定位到上面创建的block的输入区
        $(block.editor).focus();
        $(block.editor).keydown(moveByKeyDown);
        // console.log("let Ele id:" + block.Ele.parentNode.id);
        // console.log("let Ele id:" + bookObj.bookEle.id);
        // bookObj.unbindCreateBlockByClick();


        //test click event
        // $(document).click(clickStopPropagation);

        //blur实现的失去焦点时删除block，这种方式实现的block不能被拖动，一点击nav进行拖动就会触发事件
        // $('#Ele .blockContainer .ql-editor').blur(destoryContainer);

        //在content有输入时赋予container id，进行持久化，并删除destoryContainer相关事件，不再失焦删除container
        $(block.editor).on('input', persistContainer);
        // $(block).on('change',persistContainer);
        //绑定事件，用于在没有输入就离开时销毁div，
        // $(document).click(destoryContainer);
        $(bookObj.bookEle).bind('click',bookClick);
        function bookClick(e) {
            if(isDraging) {
                return false;
            }
            // console.log("let Ele id:" + bookObj.bookEle.id);
            // console.log("let Ele id:" + block.Ele.parentNode.id);
            destoryContainer(e);
            // console.log("let Ele id:" + block.Ele.parentNode.id);
            // console.log("let Ele id:" + bookObj.bookEle.id);
        }

        /*
        事件回调函数
         */

        //作为event的回调函数，不能访问this，就只能采用这种形式了。

        // console.log("let Ele id:" + block.Ele.parentNode.id);


        /*
        按方向键移动container
         */
        function moveByKeyDown(event) {
            event.stopPropagation();
            // alert("press");
            switch (event.keyCode) {  // 获取当前按下键盘键的编码
                case 37 :  // 按下左箭头键，向左移动5个像素
                    container.style.left = container.offsetLeft - 10 + "px";
                    // alert("press");
                    break;
                case 39 :  // 按下右箭头键，向右移动5个像素
                    container.style.left = container.offsetLeft + 10 + "px";
                    break;
                case 38 :  // 按下上箭头键，向上移动5个像素
                    container.style.top = container.offsetTop - 10 + "px";
                    break;
                case 40 :  // 按下下箭头键，向下移动5个像素
                    container.style.top = container.offsetTop + 10 + "px";
                    break;
            }
        }


        /*
        针对new block的事件
         */
        // 我们点击area的时候建立一个click事件，这时候算是点击了外部，
        // 于是，如果如果我们在这时候创建一个block并在block绑定事件，那他就会因为这个click事件触发操作。
        // 想到了一个办法，我们在内部设定一个count过滤掉第一次，即创建时的外部点击，就可以运行了，
        // 事实证明确实如此。完美了。
        let destroyCount = 0;

        function destoryContainer(e) {
            e.preventDefault();
            console.log('destroyCount'+destroyCount);
            // console.log("destoryContainer:$(e.target).parent($(Ele)).length:" + $(e.target).parent($(container))[0].id);
            // console.log('destoryContainer：Ele.id:' + block.Ele.id);
            // container = document.getElementById(container.id);
            // console.log("let Ele id:" + block.Ele.parentNode.id);
            // console.log("let Ele id:" + container.parentNode.id);
            /*改了结构，增加了focusViewport层，情况莫名其妙消失了，但如果再出现点击创建block后block马上消失，那就再改回来？
            * 20210506：发现是由reload创建的不会莫名其妙消失（毕竟没有点击事件）。由onclick创建的会直接因为onclick事件的穿透而马上消失，*/
            // if(destroyCount > 0 && $(e.target).parent(block.Ele.id).length == 0){
            // if(destroyCount > 0 ){
            if ($(e.target).parent(block.Ele.id).length == 0) {
                // if ($(e.target).parent(container.attr('id')).length == 0) {
                console.log("destory");
                if (block.quill.getLength() <= 1) {
                    //光标消失且无内容，则消除
                    console.log("destoryContainer：" + e.target.className);
                    // container.remove();
                    //console.log("destoryContainer：" +  block.Ele.id);


                    let id = '#'+block.Ele.id;
                    $(document).unbind('click', destoryContainer);
                    $(bookObj.bookEle).unbind('click',bookClick);
                    $(block.Ele).remove();



                    bookObj.bindCreateBlockByClick();
                    hasNewBlock = false;
                    // bookObj.bindCreateBlockByClick(bookObj.bookEle);
                    // destroyCount = 0;
                    console.log("-----------------------"+hasNewBlock+id);

                } else {
                    console.log("has blockContainer");
                }
            } else {
                destroyCount++;
            }

            return false;
        }

        /*
        在content有输入时赋予container id，进行持久化，并删除destoryContainer相关事件，不再失焦删除container
         */
        function persistContainer() {
            console.log("persistConTainer");
            //解绑专门针对非持久化block的事件
            $(block.editor).unbind('keydown', moveByKeyDown);
            // $(container).unbind('click', clickStopPropagation);
            // $(container).children().unbind('click', clickStopPropagation);
            $(document).unbind('click', destoryContainer);
            $(block.editor).unbind('input', persistContainer);
            hasNewBlock = false;


            // console.log('persistContainer:quill length:' + quill.getLength());
            let dcm = new DCM();
            dcm.persistContainerPromise(bookObj, block.quill.getContents(0).ops)
                .then(value => {
                    if (value != '') {
                        // console.log('persistContainer:set Ele.id = ' + value);
                        block.Ele.id = 'textBlock-'+value;

                    } else
                        console.log('persistContainerPromise:value is a empty string');
                });
            hasNewBlock = false;

        }
    }
    function initView(block, bookObj) {
        let EleId = createContainerId(blockInfo);
        block.Ele = '<div id="' + EleId + '" class="textBlock" ></div>';
        block.nav = '<div class="nav" ></div>';
        block.blockContainer = '<div class="blockContainer" ></div>';

        $(bookObj.bookEle).append(block.Ele);
        $('#' + EleId).append(block.nav + block.blockContainer);

        block.Ele = document.getElementById(EleId);
        //console.log('TextBlock.Ele:');
        //console.log(block.Ele);
        block.nav = block.Ele.firstChild;
        block.blockContainer = block.Ele.lastChild;

        //console.log('quill: #' + EleId + ' .blockContainer');
        block.quill = new Quill('#' + EleId + ' .blockContainer', {});
        block.editor = block.blockContainer.firstChild;


        //block拖动事件
        block.nav.onpointerdown=function (e) {
            dragNav(e,bookObj);
        };

        //focusViewport里面的所有元素都要建立click事件的拦截器，防止穿透到focusViewport.Ele
        //引发container相关的对视图进行操作的事件
        $(block.Ele).on('click', clickStopPropagation);
        $(block.Ele).children().on('click', clickStopPropagation);
        //拦截drag事件，防止穿透，要注意mousedown也会拦截click事件，所以不能绑定给children
        $(block.Ele).on('pointerdown', clickStopPropagation);
        // $(block.Ele).children().on('mousedown', clickStopPropagation);



        //block's attribute
        block.Ele.style.left = block.position.x + 'px';
        block.Ele.style.top = block.position.y + 'px';
    }
    function createContainerId(blockInfo) {
        if (blockInfo!=null&&blockInfo.id != null)
            return '_'+blockInfo.id;
        else
            return 'temp-blockEle'+new Date().getTime();
    }
}

/*
区块block：.nav的拖拽模块
 */
let isDraging = false;
function dragNav(e,book){
    // 限定范围拖动，为nav留出右侧20%的空间进行大小拖拉
    let value = $(e.target).width();
    // alert(e.offsetX/value);
    // alert(value);

    if( e.offsetX/value > 0.8) {
        //超出可拖拽范围
        return;
    }

    //专为block结构设置的，使得移动对象从nav变为nav的上层，即this.Ele
    let ele = e.target;
    ele=ele.parentNode;
    ele.addEventListener('pointerdown',start,false);

    let startX,startY;

    function start(event){

        startX=event.pageX;startY=event.pageY;
        //因为这种事件绑定，mouse一旦超出ele 范围，就会失效，
        //设定为document，也就是全局之后就没有问题了
        document.addEventListener('pointermove',move,false);

        document.addEventListener('pointerup',up,false);
    }

    function move(event){
        isDraging = true;

        let newX=event.pageX,
            newY=event.pageY;
        setElePos(newX-startX,newY-startY);
        startX=newX;startY=newY;
    }

    function up(event){
        // alert("up");
        setTimeout(function() {
            isDraging = false;
        }, 100);
        ele.removeEventListener('pointerdown',start,false);
        document.removeEventListener('pointermove',move,false);
        document.removeEventListener('pointerup',up,false);
    }

    function setElePos(distX,distY){
        // let pos=ele.getBoundingClientRect();
        // let pos=ele.getOffsetData();
        // console.log("getOffsetData:");
        // console.log(ele.offsetTop);
        // distX < 0 ? null:distX=distX+e.target.offsetWidth;
        // distY < 0 ? null:distY=distY+e.target.offsetHeight;
        //
        // book.moveViewport(-distX,book.bookEle,book.viewportEle, -distY);
        if(ele.offsetLeft+distX >0 &&
            ele.offsetLeft+distX+ele.offsetWidth < book.bookEle.scrollWidth){
            ele.style.left=(ele.offsetLeft+distX)+'px';
        }
        if(ele.offsetTop+distY >0 &&
            ele.offsetTop+distY+ele.offsetHeight < book.bookEle.scrollHeight){
            ele.style.top=(ele.offsetTop+distY)+'px';
        }


    }
}

/*事件回调函数
用于拦截click冒泡的回调函数
 */
function clickStopPropagation(str){
    console.log('############'+str.target.id+'############'+str.target.className);
    event.stopPropagation();
}