(function(global) {

    let hook = {
        'input': function(node, formObj) {
            if(!node) return false;
            let name = node.name,
                value = node.value;
            switch(node.type.toLowerCase()) {
                case 'checkbox':
                formObj[name] || ( formObj[name] = [] );
                node.checked && formObj[name].push(value);
                break;
                case 'radio':
                node.checked && (formObj[name] = value);
                break;
                default:
                formObj[name] = value;
            }
            return true;
        },
        'select': function(node, formObj) {
            if(!node) return false;
            let isMultiple = node.multiple,
                options = [];
            formObj[node.name] || ( formObj[node.name] = isMultiple ? [] : '' );
            for(let i = 0, length = node.children.length; i < length ; ++i) {
                let child = node.children[i];
                if(child.tagName.toLowerCase() === 'optgroup') {
                    try {
                        options = options.concat([].slice.call(child.children,0));
                    } catch(e) {
                        for(let j = 0, len = child.children.length; j < len; ++j) {
                            options.push(child.children[j]);
                        }
                    }
                } else if(child.tagName.toLowerCase() === 'option'){
                    options.push(child);
                }
            }
            options.forEach(op => {
                let value = op.value ? op.value : op.textContent;
                if(op.selected) {
                    isMultiple && formObj[node.name].push(value);
                    !isMultiple && ( formObj[node.name] = value );
                }
            });
            return true;
        },
        'textarea': function(node, formObj) {
            return this['input'](node, formObj);
        },

    }

    let search = function(node, formData) {
        if(!node) return;
        let tagName = node.tagName.toLowerCase();
        if(hook[tagName]) {
            hook[tagName](node, formData);
            return;
        }
        let child = node.children;
        if(child.length === 0) return;
        for(let i = 0, length = child.length ; i < length; ++i) {
            search(child[i], formData);
        }
    }

    let serialize = function(formNode) {
        if(!formNode || formNode.tagName.toLowerCase() !== 'form') {
            throw new Error('必须传入一个<form>表单节点');
        }
        let formData = {};
        search(formNode, formData);
        return formData;
    }

    global.serialize = serialize;

})(window);