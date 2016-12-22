import { findByName } from './../componentRegistry';
import findImmediateChildren from './findImmediateChildren';

let count = 0;

export default function instantiateComponent(el, parent) {
  const element = el;
  const componentName = element.dataset.component;
  const Component = findByName(componentName);
  const componentID = `component_${count++}`;
  element.dataset.componentId = componentID;

  if (typeof Component !== 'function') {
    throw new Error(`${componentName} is not a registered component`);
  }

  const instance = new Component(element, parent);
  const childComponentElements = findImmediateChildren(element, '[data-component]');
  const children = childComponentElements.map(el => instantiateComponent(el, instance));
  instance._id = componentID;
  instance.children = children;
  instance._init();

  if (parent) {
    parent.children.push(instance);
  }

  return instance;
};
