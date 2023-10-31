import { TreeStore } from '../index.module';
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';

_chai.should();
_chai.expect;

@suite class TreeStoreModuleTest {
  private SUT: TreeStore;
  private items: { [key: string]: any };

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
    this.SUT = new TreeStore(this.items);
  }

  @test 'Tree is created' () {
    expect(this.SUT.getAll()).equal(this.items);
  }

  @test 'First item has id 1' () {
    expect(this.SUT.cl_items[0]['id']).equal(1);
  }

  @test 'Get items' () {
    expect(this.SUT.getItem(7)).equal(this.items[6]);
    expect(this.SUT.getItem('яблоко')).equal(this.items[8]);
    expect(this.SUT.getItem('апельсин')).equal(`Объект с id "апельсин" не найден`);
  }

  @test 'Get children' () {
    expect(this.SUT.getChildren(4)).to.deep.equal([this.items[6],this.items[7]]);
    expect(this.SUT.getChildren(5)).to.be.an('array').that.is.empty;
    expect(this.SUT.getChildren(2)).to.deep.equal([this.items[3],this.items[4],this.items[5]]);
  }

  @test 'Get all children' () {
    expect(this.SUT.getAllChildren(2)).to.deep.equal([this.items[3],this.items[6],this.items[7],this.items[8],this.items[4],this.items[5]]);
  }

  @test 'Get all parents' () {
    expect(this.SUT.getAllParents(7)).to.deep.equal([this.items[3],this.items[1],this.items[0]]);
    expect(this.SUT.getAllParents('яблоко')).to.deep.equal([this.items[7],this.items[3],this.items[1],this.items[0]]);
    expect(this.SUT.getAllParents('апельсин')).to.be.an('array').that.is.empty;
  }
}