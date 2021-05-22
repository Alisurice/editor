function Book(viewportEle, bookInfo) {
    this.viewportEle = viewportEle;
    // console.log("Ele:"+viewportEle.attr('id'));
    this.bookInfo =  bookInfo;
    let id = "book-"+ new Date().getTime();
    this.bookEle ='<div id='+ id +' class="Book" ></div>';

    $( this.viewportEle).append(this.bookEle);
    this.bookEle = document.getElementById(id);

    this.origin = {
        x:0,
        y:0
    }
    this.originEle = '<div id=origin>O</div>';
    $(this.bookEle).append(this.originEle);
    this.originEle = document.getElementById('origin');
    this.originEle.setAttribute('style','width:10px;' +
        'height:10px;' +
        'border: 1px solid black;' +
        'position:absolute;' +
        'top:'+this.origin.x+'px' +
        'left:+'+this.origin.y+'px');

    //to retain model and view
    this.blockList=[];
    this.divList=[];

    //viewport拖动事件
    $(this.bookEle).mousedown(dragVP);

    //点击viewport vp就创建block
    let book = this;
    $(this.viewportEle).on('click', clickStopPropagation);
    $(this.bookEle).click( clickStopPropagation);


    function createBlockByClick(e) {

        if(isDraging) {
            return false;
        }
        else{
            let blockAttr = {
                position:{
                    x:e.offsetX,
                    y:e.offsetY
                }
            };

            let scrollY=book.viewportEle.scrollTop;
            let scrollX=book.viewportEle.scrollLeft;

            console.log('blockAttr:::::');
            // console.log(blockAttr);
            new TextBlock(book, undefined, blockAttr);
            // console.log("block::::::::::");
            // console.log(b);
            book.viewportEle.scrollTo(scrollX,scrollY);
        }

    }
    this.bindCreateBlockByClick =function(){
        $(book.bookEle).bind('click',createBlockByClick);
    }
    this.unbindCreateBlockByClick =function(){
        $(book.bookEle).unbind('click',createBlockByClick);
    }
    this.bindCreateBlockByClick();


    let isDraging = false;
    let controllContainer = this.viewportEle;
    let origin = this.origin;
    // console.log("::::::::"+controllContainer.scrollTop);

    // viewportEle.scrollTo(100,100);
    // console.log("::::::::"+controllContainer.scrollTop);


    /*
    expend the size of bookEle,if distX <0,mouse move from bottom to top,
    the ele's bottom will be expend
     */
    this.moveViewport = moveViewport;
    function moveViewport(distX, bookEle,viewportEle, distY) {
        let expand = 200;
        // console.log(Ele.scrollWidth+"|||||"+distX);
        // Ele.style.width=(Ele.scrollWidth+distX)+'px';
        // console.log(Ele.style.width);
        // Ele.style.height=(Ele.scrollHeight+distY)+'px';

        //判断是左上还是右下的运动，html只能往右下滚动，页面滚动方向要和鼠标运动方向相反

        // console.log("distX:"+distX);
        // console.log("viewportEle.scrollLeft::"+viewportEle.scrollLeft);
        let scrollX = viewportEle.scrollLeft - distX;

        // console.log('scrollX:'+scrollX+" distX:"+distX+" viewportEle"+viewportEle.scrollLeft);
        // console.log('scrollX:'+scrollX);
        // // console.log("Ele.scrollWidth:"+Ele.scrollWidth+" viewportEle:"+viewportEle.scrollWidth);
        let updateStatus = false;
        if (scrollX < 0) {
            // console.log('scrollX:'+scrollX);
            // 视窗要定位到book的原点以左，只能通过改动bookwidth和原点位置来实现，
            // 没有办法让viewport滚动到left的负数位置
            origin.x -= distX - expand;


            // console.log(" Ele.style.width:"+ Ele.style.width);
            // console.log(" new:"+ (Ele.scrollWidth-distX));
            bookEle.style.width = (bookEle.scrollWidth - (distX - expand)) + 'px'
            scrollX = expand;
            updateStatus = true;
        } else if (scrollX + viewportEle.clientWidth > bookEle.scrollWidth) {
            bookEle.style.width = (bookEle.scrollWidth + distX + expand) + 'px';
            // console.log('scrollX:'+scrollX);

        }

        let scrollY = viewportEle.scrollTop - distY;
        // console.log('scrollY:'+scrollY);
        // console.log('scrollTop:'+viewportEle.scrollTop);
        if (scrollY < 0) {

            // console.log('scrollY:'+scrollY);
            // console.log('scrollHeight:'+Ele.scrollHeight);
            // 视窗要定位到book的原点以左，只能通过改动bookwidth和原点位置来实现，
            // 没有办法让viewport滚动到left的负数位置
            origin.y -= distY - expand;
            bookEle.style.height = (bookEle.scrollHeight - (distY - expand)) + 'px'
            scrollY = expand;
            updateStatus = true;
        } else if (scrollY + viewportEle.clientHeight > bookEle.scrollHeight) {
            bookEle.style.height = (bookEle.scrollHeight + distY + expand) + 'px';
            // console.log('scrollX:'+scrollX);
        }

        if (updateStatus) {
            //updateBlockPosition();
            console.log("origiin:");
            console.log(origin);
            updateOrigin(origin);

        }


        // console.log('scrollX:'+scrollX);
        viewportEle.scrollTo(scrollX, scrollY);
    }


    function dragVP(e){
        let bookEle=e.target;
        // console.log("ele:::::::::"+Ele.id);
        let startX,startY;
        start(e);
        function start(event){


            startX=event.clientX;startY=event.clientY;
            //因为这种事件绑定，mouse一旦超出ele 范围，就会失效，
            //设定为document，也就是全局之后就没有问题了
            document.addEventListener('mousemove',move,false);

            document.addEventListener('mouseup',up,false);
        }

        // let wait = false;
        // let timeId = setInterval(function () {
        //     wait = !wait;
        //     console.log(wait);
        // }, 50)
        function move(event){
            // setTimeout(function() {
            //     isDraging = false;
            // }, 100);
            isDraging = true;
            // if(wait){
            //     return;
            // }
            let newX=event.clientX,
                newY=event.clientY;

            //有待实现静止拖动，
            // if(event.offsetX < viewportEle.offsetLeft){
            //     setElePos()
            // }
            // else if(event.offsetX > viewportEle.offsetLeft+viewportEle.clientWidth){
            //     newX += 10;
            // }
            setElePos(newX-startX,newY-startY);
            startX=newX;startY=newY;
        }

        function up(event){
            // alert("up");
            // console.log("drag:::::::"+isDraging);
            //定时器，当拖动expandms内，那时候松开都算点击，超过了就不算点击事件了。
            setTimeout(function() {
                isDraging = false;
            }, 100);
            // Ele.removeEventListener('mousedown',start,false);
            document.removeEventListener('mousemove',move,false);
            document.removeEventListener('mouseup',up,false);
            // window.clearInterval(timeId);
        }

        function setElePos(distX,distY){
            moveViewport(distX, bookEle,viewportEle, distY);
            // console.log("after.scrollto::"+viewportEle.scrollLeft);
            // console.log('scrollX:'+scrollX+" viewportEle"+viewportEle.scrollLeft);


        }
    }

    let originEle = this.originEle;
    function updateOrigin(origin) {
        originEle.style.left = origin.x+'px';
        originEle.style.top = origin.y+'px';
    }
}

function clickStopPropagation(str){
    console.log('############'+str.target.id+'############'+str.target.className);
    event.stopPropagation();
}


