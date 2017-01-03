import dom from './utils/dom';
import { assert, expect } from 'chai';
import Component from './../src/Component';
import IfComponent from './../src/IfComponent';
import EachComponent from './../src/EachComponent';
import OutComponent from './../src/OutComponent';
import mount, { mountChildren, processElement, processComponentAttribute } from './../src/mount';

describe('mount.js', () => {
  before(done => {
    dom(done);
  });

  describe('mounts component', () => {
    it('creates app', () => {
      const div = document.createElement('div');
      const app = mount(div, Component);

      assert(app.name === 'root', 'app name is not "root"');
      assert(app.el === div, 'elements are not equal');
      assert(app.children.length === 0, 'children found');
    });

    it('creates app with children', () => {
      const div = document.createElement('div');
      div.innerHTML = `
        <div data-if="true">
          <div data-out="{}"></div>
        </div>
        <div data-each="[]"></div>
      `;
      const app = mount(div, Component);
      const ifElement = div.querySelector('[data-if]');

      assert(app.children.length === 2, 'children.length does not equal 2');
      assert(app.children[0].el === ifElement, 'elements do not match');
      assert(app.children[0].children.length === 1, 'children.length does not equal 1');
    });

    it('does not support multiple component attributes', () => {
      const div = document.createElement('div');
      div.innerHTML = '<div data-if="true" data-each="[]" data-out="{}"></div>';
      const app = mount(div, Component);

      assert(app.children.length === 1, 'children.length does not equal 1');
    });

    it('favors IfComponent, then EachComponent, then OutComponent', () => {
      const div = document.createElement('div');
      div.innerHTML = '<div data-if="true" data-each="[]" data-out="{}"></div>';
      let app = mount(div, Component);

      assert(app.children[0] instanceof IfComponent, 'child is not an instance of IfComponent');
      div.innerHTML = '<div data-each="[]" data-out="{}"></div>';
      app = mount(div, Component);
      assert(app.children[0] instanceof EachComponent, 'child is not an instance of EachComponent');
      div.innerHTML = '<div data-out="{}" data-component="Tester"></div>';
      app = mount(div, Component);
      assert(app.children[0] instanceof OutComponent, 'child is not an instance of OutComponent');
    });
  });

  describe('processes element', () => {
    it('IfComponent', () => {
      const div = document.createElement('div');
      const app = mount(div, Component);
      div.innerHTML = '<span data-if="true"></span>';
      const span = div.children[0];
      const component = processElement(span, app);

      assert(component.parent === app, 'parent is not app');
      assert(component instanceof IfComponent, 'component is not an instanceof IfComponent');
    });

    it('EachComponent', () => {
      const div = document.createElement('div');
      const app = mount(div, Component);
      div.innerHTML = '<span data-each="[]"></span>';
      const span = div.children[0];
      const component = processElement(span, app);

      assert(component.parent === app, 'parent is not app');
      assert(component instanceof EachComponent, 'component is not an instanceof EachComponent');
    });

    it('OutComponent', () => {
      const div = document.createElement('div');
      const app = mount(div, Component);
      div.innerHTML = '<span data-out="{}"></span>';
      const span = div.children[0];
      const component = processElement(span, app);

      assert(component.parent === app, 'parent is not app');
      assert(component instanceof OutComponent, 'component is not an instanceof OutComponent');
    });

    it('ignores element without a component attribute', () => {
      const div = document.createElement('div');
      const app = mount(div, Component);
      div.innerHTML = '<span></span>';
      const span = div.children[0];
      const component = processElement(span, app);

      // eslint-disable-next-line no-undefined
      assert(component === undefined, 'component is not undefined');
    });
  });

  it('processes component attribute', () => {
    // intentional extra space
    const test = 'Test as  test';
    // intentional spaces
    const other = ' Other ';

    assert(
      processComponentAttribute(test).constructorName === 'Test',
      'constructor name is not Test'
    );
    assert(processComponentAttribute(test).instanceName === 'test', 'instance name is not test');
    assert(
      processComponentAttribute(other).constructorName === 'Other',
      'constructor name is not Other'
    );
    assert(processComponentAttribute(other).instanceName === null, 'instance name is not null');
  });

  describe('mounts children', () => {
    it('mounts and extends 3 children', () => {
      const div = document.createElement('div');
      const otherDiv = document.createElement('div');
      const app = mount(div, Component);
      otherDiv.innerHTML = `
        <div data-if="true"></div>
        <div data-if="false">
          <div data-each="[]"></div>
        </div>
      `;
      mountChildren(otherDiv, app, child => Object.assign(child, { testing: '123...' }));

      assert(app.children.length === 2, 'children.length is not 2');
      assert(app.children[1].children.length === 1, 'children.length is not 1');
      assert(app.children[0].testing === '123...', 'not testing 123...');
    });

    it('returns early and does not mount children', () => {
      const div = document.createElement('div');
      const otherDiv = document.createElement('div');
      const app = mount(div, Component);
      app.shouldMountChildren = () => false;
      otherDiv.innerHTML = `
        <div data-if="true"></div>
        <div data-if="false">
          <div data-each="[]"></div>
        </div>
      `;
      mountChildren(otherDiv, app, child => Object.assign(child, { testing: '123...' }));

      assert(app.children.length === 0, 'children.length is not 0');
    });
  });
});
