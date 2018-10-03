# utils
自己写的工具库，可能非常糟糕

# lazyLoad.js 图片懒加载
## Usage
```html
<script src="lazyLoad.js"></script>
<script>
    var lazy = new LazyLoad();
    var imgs = [].slice.call(document.querySelectorAll('img'));
    lazy.add(imgs); // imgs 必须是数组
</script>
```
## Compat
* 因为部分用的是ES6语法，可能不支持比较旧的浏览器。
* 对高版本的IE做了兼容处理