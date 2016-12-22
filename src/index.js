'use strict';

import Component from './Component';
import { register } from './componentRegistry';
import instantiateComponent from './utilities/instantiateComponent';

const mount = (element, parent) => instantiateComponent(element, parent);

export default {
  Component,
  mount,
  register,
};
