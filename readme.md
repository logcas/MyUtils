# utils
自己写的工具库，可能非常糟糕

# lazyLoad.js 图片懒加载
## Usage
将图片地址放入IMG标签的自定义`data-imgurl`中，`src`属性为空，然后这样：
```html
<script src="lazyLoad.js"></script>
<script>
    var lazy = new LazyLoad();
    var imgs = [].slice.call(document.querySelectorAll('img'));
    lazy.add(imgs); // imgs 必须是数组
</script>
```

# drag.js 原生拖拽
## Usage
```html
<script src="drag.js"></script>
<script>
    var app = document.querySelector('#app');
    var drag = new Drag(app);
</script>
```

# Router.js 轻量级SPA路由
## Usage
```html
<script src="src/index.js"></script>
<script>
    var router = new Router(document.getElementById('app'));
    router.route('/p1',function(res) {
        res.render(`Hello,${res.params.name}`);
    });
    router.route('/p2',function(res) {
        res.render('this is page 2');
    });
</script>
```

## API
* `route(path,callback)` 路由挂载

其中`path`为路由路径，`callback`为接受一个`res`参数的回调杉树，`res`为`object`类型，有`res.render()`接受一个字符串作为渲染模板，`res.params`为解析查询字符串的对象。
* `route.go(n)` 

它只是调用了`window.history.go(n)`。