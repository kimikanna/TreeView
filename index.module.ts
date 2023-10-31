export class TreeStore {
    cl_items: { [key: string]: any };
    ids: { [key: number | string]: number } = {};

    constructor(items: { [key: string]: any }) {
        this.cl_items = items;
        for (let i = 0; i < this.cl_items.length; i++) {
            this.ids[items[i]['id']] = i;
        }
    }

    getAll() {
        return(this.cl_items);
    }

    getItem(itemID: number | string) {
        var item: any;
        this.ids[itemID] === undefined
            ? item = `Объект с id "${itemID}" не найден`
            : item = this.cl_items[this.ids[itemID]];
        return(item);
    }

    getChildren(parentID: number | string) {
        var children = Array<{ [key: string]: any }>();
        for (let i = 0; i < this.cl_items.length; i++) {
            if (this.cl_items[i]['parent'] == parentID) {
                children.push(this.cl_items[i]);
            }
        }
        return(children);
    }

    getAllChildren(parentID: number | string) {
        var children = Array<{ [key: string]: any }>();
        for (let i = 0; i < this.cl_items.length; i++) {
            if (this.cl_items[i]['parent'] == parentID) {
                children.push(this.cl_items[i]);
                children = children.concat(this.getAllChildren(this.cl_items[i]['id']));
            }
        }
        return(children);
    }

    getAllParents(childID: number | string) {
        var parents = Array<{ [key: string]: any }>();
        for (let i = 0; i < this.cl_items.length; i++) {
            if (this.cl_items[i]['id'] == childID) {
                if (typeof this.getItem(this.cl_items[i]['parent']) == 'string') {
                    break;
                }
                parents.push(this.getItem(this.cl_items[i]['parent']));
                parents = parents.concat(this.getAllParents(this.cl_items[i]['parent']));
                break;
            }
        }
        return(parents);
    }
}

const items = [
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
const ts = new TreeStore(items);
console.log(ts.getAll());                   // [{ id: 1, parent: 'root' },{ id: 2, parent: 1, type: 'test' },{ id: 3, parent: 1, type: 'test' },{ id: 4, parent: 2, type: 'test' },{ id: 5, parent: 2, type: 'test' },{ id: 6, parent: 2, type: 'test' },{ id: 7, parent: 4, type: null },{ id: 8, parent: 4, type: null },{ id: 'яблоко', parent: 4, type: null }] 
console.log(ts.getItem(7));                 // { id: 7, parent: 4, type: null }
console.log(ts.getItem('яблоко'));          // пример текстового id, вернёт: { id: 'яблоко', parent: 8, type: null }
console.log(ts.getItem('груша'));           // пример несуществующего id, вернёт: 'Объект с id "груша" не найден'
console.log(ts.getChildren(4));             // [{ id: 7, parent: 4, type: null },{ id: 8, parent: 4, type: null }]
console.log(ts.getChildren(5));             // []
console.log(ts.getChildren(2));             // [{ id: 4, parent: 2, type: 'test' },{ id: 5, parent: 2, type: 'test' },{ id: 6, parent: 2, type: 'test' }]
console.log(ts.getAllChildren(2));          // [{ id: 4, parent: 2, type: 'test' },{ id: 7, parent: 4, type: null },{ id: 8, parent: 4, type: null },{ id: 'яблоко', parent: 4, type: null },{ id: 5, parent: 2, type: 'test' },{ id: 6, parent: 2, type: 'test' }]
console.log(ts.getAllParents(7));           // [{ id: 4, parent: 2, type: 'test' },{ id: 2, parent: 1, type: 'test' },{ id: 1, parent: 'root' }]
console.log(ts.getAllParents('яблоко'));    // [{ id: 8, parent: 4, type: null },{ id: 4, parent: 2, type: 'test' },{ id: 2, parent: 1, type: 'test' },{ id: 1, parent: 'root' }]
console.log(ts.getAllParents('груша'));     // []