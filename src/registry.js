import CONSTANTS from './constants';

let _components = {};

const register = components => {
  _components = Object.assign(_components, components);
};

const find = (name = '') => {
  const trimmedName = name.trim();
  const component = _components[trimmedName];

  if (trimmedName && !component) {
    // eslint-disable-next-line new-cap
    console.warn(CONSTANTS.MESSAGE.UNREGISTERED_COMPONENT(trimmedName));
  }

  return component;
};

export default {
  find,
  register,
};
