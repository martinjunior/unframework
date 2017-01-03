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

  elements.forEach(element => {
    const component = processElement(element, parent);
    if (!component) { return; }
    parent.children.push(cb(component));
  });

  parent.children.forEach(child => {
    mountChildren(child.el, child, cb);
  });
}

export function processElement(el, parent) {
  const component = processComponentAttribute(el.dataset.component);
  const Constructor = registry.find(component.constructorName);
  const ifExpr = el.dataset.if;
  const eachExpr = el.dataset.each;
  const outExpr = el.dataset.out;

  if (ifExpr) { return new IfComponent(el, parent); }
  if (eachExpr) { return new EachComponent(el, parent); }
  if (outExpr) { return new OutComponent(el, parent); }
  if (Constructor) {
    const instance = new Constructor(el, parent);
    return Object.assign(instance, {
      name: component.instanceName,
    });
  }
}

export function processComponentAttribute(name = '') {
  const trimmedName = name.trim();
  const matches = (trimmedName.match(/([A-Za-z]+)[ ]+as[ ]+([A-Za-z]+)/) || []);

  return {
    constructorName: matches[1] || trimmedName,
    instanceName: matches[2] || null,
  };
}
