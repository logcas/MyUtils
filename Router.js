/**
 * 
 *  @name Light-router 轻量级前端单页路由
 *  @version v0.9.0
 * 
 */

 ;(function(window) {

    class Router {

        constructor(_mount, routes) {

            if(!_mount && typeof _mount !== 'object') {
                throw new Error('路由视图不存在或不是object');
            }

            this.$mount = _mount;

            if(routes) {
                this.$routes = routes;
            } else {
                this.$routes = {};
            }

            this.$params = {};

            this._init();

            // 监听
            window.addEventListener('hashchange',this._monitor);
            window.addEventListener('load',this._monitor);

        }

        _init() {

            this._monitor = (e) => {

                var hash = window.location.hash.slice(1),
                    idx = hash.indexOf('?'),
                    str = '',
                    path = hash;

                if(idx !== -1) { 
                    str = hash.slice(idx + 1);
                    path = hash.slice(0,idx);
                }

                this._render(path,str);

            }

        }

        route(path, handler) {

            if(!path) {
                throw new Error('path must be provided.');
            }

            if(!handler) {
                throw new Error('handler must be provided.');
            }

            this.$routes[path] = { 
                handler
            };

        }

        _render(path,str) {

            var p = this.$routes[path];

            if(!p) return;

            var render = component => {
                this.$mount.innerHTML = component;
            }

            var params = this._parseParams(str);

            var res = {
                render,
                params
            }

            p.handler.call(this,res);

        }

        _parseParams(str) {

            var items = str.split('&'),
                query = {};

            items.forEach(item => {

                var [key,value] = item.split('=');
                query[key] = value;

            });

            return query;
        }

        go(n) {
            if(!n) {
                throw new Error('调用 go() 必须提供一个参数');
            }
            window.history.go(n);
        }

        push(path) {

            var idx = path.indexOf('?'),
                hash = '#' + path,
                str = '';

            if(idx !== -1) {
                str = path.slice(idx + 1);
                path = path.slice(0, idx);
            }

            var p = this.$routes[path];

            if(!p) return;

            window.location.hash = hash;

            this._render(path,str);

        }

    }

    window.Router = Router;

 })(window);