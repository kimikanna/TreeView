"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeStore = void 0;
var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        this.ids = {};
        this.cl_items = items;
        for (var i = 0; i < this.cl_items.length; i++) {
            this.ids[items[i]['id']] = i;
        }
    }
    TreeStore.prototype.getAll = function () {
        return (this.cl_items);
    };
    TreeStore.prototype.getItem = function (itemID) {
        var item;
        this.ids[itemID] === undefined
            ? item = "\u041E\u0431\u044A\u0435\u043A\u0442 \u0441 id \"".concat(itemID, "\" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D")
            : item = this.cl_items[this.ids[itemID]];
        return (item);
    };
    TreeStore.prototype.getChildren = function (parentID) {
        var children = Array();
        for (var i = 0; i < this.cl_items.length; i++) {
            if (this.cl_items[i]['parent'] == parentID) {
                children.push(this.cl_items[i]);
            }
        }
        return (children);
    };
    TreeStore.prototype.getAllChildren = function (parentID) {
        var children = Array();
        for (var i = 0; i < this.cl_items.length; i++) {
            if (this.cl_items[i]['parent'] == parentID) {
                children.push(this.cl_items[i]);
                children = children.concat(this.getAllChildren(this.cl_items[i]['id']));
            }
        }
        return (children);
    };
    TreeStore.prototype.getAllParents = function (childID) {
        var parents = Array();
        for (var i = 0; i < this.cl_items.length; i++) {
            if (this.cl_items[i]['id'] == childID) {
                if (typeof this.getItem(this.cl_items[i]['parent']) == 'string') {
                    break;
                }
                parents.push(this.getItem(this.cl_items[i]['parent']));
                parents = parents.concat(this.getAllParents(this.cl_items[i]['parent']));
                break;
            }
        }
        return (parents);
    };
    return TreeStore;
}());
exports.TreeStore = TreeStore;
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
    { id: 'яблоко', parent: 8, type: null },
];
var ts = new TreeStore(items);
console.log(ts.getAll()); // [{ id: 1, parent: 'root' },{ id: 2, parent: 1, type: 'test' },{ id: 3, parent: 1, type: 'test' },{ id: 4, parent: 2, type: 'test' },{ id: 5, parent: 2, type: 'test' },{ id: 6, parent: 2, type: 'test' },{ id: 7, parent: 4, type: null },{ id: 8, parent: 4, type: null },{ id: 'яблоко', parent: 4, type: null }] 
console.log(ts.getItem(7)); // { id: 7, parent: 4, type: null }
console.log(ts.getItem('яблоко')); // пример текстового id, вернёт: { id: 'яблоко', parent: 8, type: null }
console.log(ts.getItem('груша')); // пример несуществующего id, вернёт: 'Объект с id "груша" не найден'
console.log(ts.getChildren(4)); // [{ id: 7, parent: 4, type: null },{ id: 8, parent: 4, type: null }]
console.log(ts.getChildren(5)); // []
console.log(ts.getChildren(2)); // [{ id: 4, parent: 2, type: 'test' },{ id: 5, parent: 2, type: 'test' },{ id: 6, parent: 2, type: 'test' }]
console.log(ts.getAllChildren(2)); // [{ id: 4, parent: 2, type: 'test' },{ id: 7, parent: 4, type: null },{ id: 8, parent: 4, type: null },{ id: 'яблоко', parent: 4, type: null },{ id: 5, parent: 2, type: 'test' },{ id: 6, parent: 2, type: 'test' }]
console.log(ts.getAllParents(7)); // [{ id: 4, parent: 2, type: 'test' },{ id: 2, parent: 1, type: 'test' },{ id: 1, parent: 'root' }]
console.log(ts.getAllParents('яблоко')); // [{ id: 8, parent: 4, type: null },{ id: 4, parent: 2, type: 'test' },{ id: 2, parent: 1, type: 'test' },{ id: 1, parent: 'root' }]
console.log(ts.getAllParents('груша')); // []
