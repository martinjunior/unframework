import Component from './Component';
import IfComponent from './IfComponent';
import EachComponent from './EachComponent';
import OutComponent from './OutComponent';
import registry from './registry';
import { findImmediateChildren } from './utils';
import tree from './tree';
import CONSTANTS from './constants';

export default function mount(el, Constructor, props, initialState) {
  const root = new Constructor(el, null, props);
  root.name = 'root';
  root.props = Object.assign({}, root.props, props);
  mountChildren(el, root);
  root.acceptState(initialState);

  return root;
}

export function mountChildren(el, parent, cb = x => x) {
  const elements = findImmediateChildren(el, CONSTANTS.COMPONENT_SELECTOR_LIST);

  if (parent.shouldMountChildren() === false) {
    return;
  }

  elements.forEach(element => processElement(element, parent, child => {
    parent.children.push(cb(child));
  }));

  parent.children.forEach(child => {
    mountChildren(child.el, child, cb);
  });
}

function processElement(el, parent, cb) {
  const component = processComponentAttribute(el.dataset.component);
  const Constructor = registry.find(component.constructorName);
  const ifExpr = el.dataset.if;
  const eachExpr = el.dataset.each;
  const outExpr = el.dataset.out;

  if (ifExpr) {
    cb(new IfComponent(el, parent));
    return;
  }
  if (eachExpr) {
    cb(new EachComponent(el, parent));
    return;
  }
  if (outExpr) {
    cb(new OutComponent(el, parent));
    return;
  }
  if (Constructor) {
    const instance = new Constructor(el, parent);
    cb(Object.assign(instance, {
      name: component.instanceName,
    }));
    return;
  }
}

function processComponentAttribute(name = '') {
  const matches = (name.match(/([A-Za-z]+) as ([A-Za-z]+)/) || []);

  return {
    constructorName: matches[1] || name,
    instanceName: matches[2],
  };
}
