'use strict';

import differentiate from './utilities/differentiate';

let _components = {};

const register = components => {
  const difference = differentiate(_components, components, key => {
    throw new Error(`${key} component already registered`);
  });

  _components = { ..._components, ...difference };
};

const findByName = (name, components = _components) => {
  return components[name];
};

export {
  findByName,
  register,
};
