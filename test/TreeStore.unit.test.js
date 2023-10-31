"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_module_1 = require("../index.module");
const mocha_1 = require("@testdeck/mocha");
const _chai = __importStar(require("chai"));
const chai_1 = require("chai");
_chai.should();
_chai.expect;
let TreeStoreModuleTest = (() => {
    let _classDecorators = [mocha_1.suite];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _member_decorators;
    let _member_decorators_1;
    let _member_decorators_2;
    let _member_decorators_3;
    let _member_decorators_4;
    let _member_decorators_5;
    var TreeStoreModuleTest = _classThis = class {
        constructor() {
            this.SUT = (__runInitializers(this, _instanceExtraInitializers), void 0);
        }
        before() {
            this.items = [
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
            this.SUT = new index_module_1.TreeStore(this.items);
        }
        'Tree is created'() {
            (0, chai_1.expect)(this.SUT.getAll()).equal(this.items);
        }
        'First item has id 1'() {
            (0, chai_1.expect)(this.SUT.cl_items[0]['id']).equal(1);
        }
        'Get items'() {
            (0, chai_1.expect)(this.SUT.getItem(7)).equal(this.items[6]);
            (0, chai_1.expect)(this.SUT.getItem('яблоко')).equal(this.items[8]);
            (0, chai_1.expect)(this.SUT.getItem('апельсин')).equal(`Объект с id "апельсин" не найден`);
        }
        'Get children'() {
            (0, chai_1.expect)(this.SUT.getChildren(4)).to.deep.equal([this.items[6], this.items[7]]);
            (0, chai_1.expect)(this.SUT.getChildren(5)).to.be.an('array').that.is.empty;
            (0, chai_1.expect)(this.SUT.getChildren(2)).to.deep.equal([this.items[3], this.items[4], this.items[5]]);
        }
        'Get all children'() {
            (0, chai_1.expect)(this.SUT.getAllChildren(2)).to.deep.equal([this.items[3], this.items[6], this.items[7], this.items[8], this.items[4], this.items[5]]);
        }
        'Get all parents'() {
            (0, chai_1.expect)(this.SUT.getAllParents(7)).to.deep.equal([this.items[3], this.items[1], this.items[0]]);
            (0, chai_1.expect)(this.SUT.getAllParents('яблоко')).to.deep.equal([this.items[7], this.items[3], this.items[1], this.items[0]]);
            (0, chai_1.expect)(this.SUT.getAllParents('апельсин')).to.be.an('array').that.is.empty;
        }
    };
    __setFunctionName(_classThis, "TreeStoreModuleTest");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _member_decorators = [mocha_1.test];
        _member_decorators_1 = [mocha_1.test];
        _member_decorators_2 = [mocha_1.test];
        _member_decorators_3 = [mocha_1.test];
        _member_decorators_4 = [mocha_1.test];
        _member_decorators_5 = [mocha_1.test];
        __esDecorate(_classThis, null, _member_decorators, { kind: "method", name: 'Tree is created', static: false, private: false, access: { has: obj => 'Tree is created' in obj, get: obj => obj['Tree is created'] }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _member_decorators_1, { kind: "method", name: 'First item has id 1', static: false, private: false, access: { has: obj => 'First item has id 1' in obj, get: obj => obj['First item has id 1'] }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _member_decorators_2, { kind: "method", name: 'Get items', static: false, private: false, access: { has: obj => 'Get items' in obj, get: obj => obj['Get items'] }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _member_decorators_3, { kind: "method", name: 'Get children', static: false, private: false, access: { has: obj => 'Get children' in obj, get: obj => obj['Get children'] }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _member_decorators_4, { kind: "method", name: 'Get all children', static: false, private: false, access: { has: obj => 'Get all children' in obj, get: obj => obj['Get all children'] }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _member_decorators_5, { kind: "method", name: 'Get all parents', static: false, private: false, access: { has: obj => 'Get all parents' in obj, get: obj => obj['Get all parents'] }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TreeStoreModuleTest = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TreeStoreModuleTest = _classThis;
})();
