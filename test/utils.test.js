import dom from './utils/dom';
import { findReferenceNode, findNextSiblings, findImmediateChildren } from './../src/utils';
import { assert, expect } from 'chai';

describe('utils.js', () => {
  before(done => {
    dom(done);
  });

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('finds reference nodes', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
    `;
    document.body.appendChild(div);
    const nodes = [...div.children];
    const one = nodes.find(node => node.classList.contains('one'));
    const two = nodes.find(node => node.classList.contains('two'));
    const three = nodes.find(node => node.classList.contains('three'));

    assert(findReferenceNode(nodes) === one, 'nodes are not the same');
    div.removeChild(one);
    assert(findReferenceNode(nodes) === two, 'nodes are not the same');
    div.removeChild(two);
    assert(findReferenceNode(nodes) === three, 'nodes are not the same');
    div.removeChild(three);
    assert(findReferenceNode(nodes) === null, 'reference node is not null');
  });

  it('finds next siblings', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
    `;
    document.body.appendChild(div);
    const nodes = [...div.children];
    const one = nodes.find(node => node.classList.contains('one'));
    const two = nodes.find(node => node.classList.contains('two'));
    const three = nodes.find(node => node.classList.contains('three'));

    assert(findNextSiblings(one, nodes).length === 2, 'node length does not equal 2');
    assert(findNextSiblings(two, nodes).length === 1, 'node length does not equal 1');
    assert(findNextSiblings(two, nodes)[0] === three, 'siblings does not equal node three');
    assert(findNextSiblings(three, nodes).length === 0, 'node length does not equal 0');
  });

  it('finds immediate children', () => {
    const selector = '[data-component]';
    const div = document.createElement('div');
    div.innerHTML = `
      <div data-component="One">
        <button data-ref="one"></button>
        <div data-component="Two">
          <button data-ref="two"></button>
        </div>
        <span data-ref="three"></span>
        <div data-component="Three">
          <button data-ref="four"></button>
          <div data-component="Five">
            <div data-component="Six"></div>
          </div>
          <div data-component="Seven"></div>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    const one = div.querySelector('[data-component="One"]');
    const three = div.querySelector('[data-component="Three"]');

    assert(
      findImmediateChildren(div, selector).length === 1,
      'children count is not 1'
    );
    assert(
      findImmediateChildren(div, selector)[0] === one,
      'first child does is not div "one"'
    );
    assert(
      findImmediateChildren(three, selector).length === 2,
      'children count is not 2'
    );
  });
});
