let _components = {};

const register = components => {
  _components = { ..._components, ...components };
};

const findByName = (name, components = _components) => {
  return components[name];
};

export {
  findByName,
  register,
};
