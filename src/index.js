import Component from './Component';
import registry from './registry';
import mount from './mount';

export default {
  Component,
  mount,
  register: registry.register,
};
