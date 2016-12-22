import Component from './Component';
import IfComponent from './components/IfComponent';
import { register } from './componentRegistry';
import instantiateComponent from './utilities/instantiateComponent';

const mount = (element, parent) => instantiateComponent(element, parent);

register({ IfComponent });

export default {
  Component,
  mount,
  register,
};
