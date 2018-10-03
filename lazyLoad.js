/*
@params data-imgurl 图片地址
*/

;(function (window){

    var lazyImgs = [], // 懒加载图片组
        scrollFnControl = null,
        innerHeight = window.innerHeight || document.documentElement.clientHeight;

    class LazyLoad {
        constructor(){
            this.monitorScroll();
        }

        // 添加图片
        add(imgs) {
            // 限制传入对象数组
            if(!imgs || Object.prototype.toString.call(imgs) !== '[object Array]') {
                throw new Error('add() 函数必须传入图片数组');
            }
            console.log('add1');
            //this.lazyImgs = [].concat(this.lazyImgs,imgs);
            let imgsLength = imgs.length;
            for(let i = 0; i < imgsLength ; ++i) {
                let offsetTop = imgs[i].getBoundingClientRect().top;
                console.log(offsetTop);
                imgs[i].setAttribute('data-offsettop',offsetTop);
                imgs[i].setAttribute('data-hasdisplay',0);
            }
            console.log('add2');

            lazyImgs = [].concat(lazyImgs,imgs);
        }

        // 添加滚动监控
        monitorScroll() {
            console.log('monitor');
            addEventMonitor(window,'scroll',scrollFn);
        }
        
    }

    // 判断是否显示
    function isDisplay() {
        let scrollTop = getScrollTop(),
            len = lazyImgs.length;
        for(let i=0;i<len;++i) {
            let hasDisplay = lazyImgs[i].getAttribute('data-hasdisplay');
            if(hasDisplay == 0) {
                let top = lazyImgs[i].getAttribute('data-offsettop') - scrollTop;
                console.log(top);
                // 图片进入视口
                if(top < innerHeight) {
                    lazyImgs[i].src = lazyImgs[i].getAttribute('data-imgurl');
                    lazyImgs[i].setAttribute('data-hasdisplay',1);
                }
            }
        }
    }

    function scrollFn() {
        clearTimeout(scrollFnControl);

        scrollFnControl = setTimeout(() => {
            isDisplay();
        },300);
    }

    // 获取滚动条距离顶部的高度
    function getScrollTop() {
        var scrollTop;
        if(document.compatMode !== 'BackCompat') {
            scrollTop = document.documentElement.scrollTop;
        } else {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    // 事件处理
    function addEventMonitor(elem,event,handler) {
        elem = elem || window;
        if(elem.addEventListener) {
            elem.addEventListener(event,handler,false);
        } else if(elem.attchEvent) { //IE
            elem.attachEvent('on' + event,handler);
        } else {
            elem['on' + event] = handler;
        }
    }
    
    // 暴露
    window.LazyLoad = LazyLoad;

})(window)