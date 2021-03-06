# utils
自己写的工具库，可能非常糟糕

# Serialize.js 表单序列化
快速将`<form></form>`中的表单序列化成一个键值对象（`Object`）

## screenshot
![serialize](http://pco615n7k.bkt.clouddn.com/%E8%A1%A8%E5%8D%95%E5%BA%8F%E5%88%97%E5%8C%96.PNG)

## Usage
```html
    <form>
        <p>用户名：<input type="text" name="username"></p>
        <p>密码：<input type="password" name="password"></p>
        <p>电子邮箱：<input type="email" name="email"></p>
        <p id="sex">性别：男<input type="radio" name="sex" value="man">女<input type="radio" name="sex" value="woman"></p>
        <p>国家地区：<select name="origin">
                <optgroup label="c1">
                    <option value="China">中国</option>
                    <option value="USA">美国</option>
                </optgroup>
                <optgroup label="c2">
                    <option value="JP">日本</option>
                    <option value="Canada">加拿大</option>
                </optgroup>
            </select></p>
        <p>选择Range：<input type="range" min="10" max="20" value="12" name="range"></p>
        <p>输入栏<textarea name="fucker"></textarea></p>
        <p id="hobby">爱好：篮球<input type="checkbox" name="hobby" value="篮球">足球<input type="checkbox" name="hobby" value="足球">
            羽毛球<input type="checkbox" name="hobby" value="羽毛球"></p>
    </form>
    <button id="btn">Click</button>
    <script src="Serialize.js"></script>
    <script>
        var o = document.forms[0],
            btn = document.querySelector('#btn'),
            output = document.querySelector('#output');

        btn.onclick = function (e) {
            var obj = serialize(o);
            console.log(obj);
        }
    </script>
```

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