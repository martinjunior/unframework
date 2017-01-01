import CONSTANTS from './constants';

const findChild = (predicate, root) => {
  return predicate(root)
    ? root
    : root.children.find(child => predicate(child))
    || root.children.find(child => findChild(predicate, child));
};

const recurseParents = (cb, root) => {
  let parent = root.parent;
  while (parent) {
    cb(parent);
    parent = parent.parent;
  }
};

const findNamedInstanceParents = instance => {
  const namedParents = [];
  recurseParents(parent => {
    const name = parent.name;
    if (!name) { return; }
    if (containsName(name, namedParents)) {
      // eslint-disable-next-line new-cap
      throw new Error(CONSTANTS.MESSAGE.DUPLICATE_INSTANCE_NAME(name));
    }
    namedParents.push(parent);
  }, instance);
  return namedParents;
};

const branchNamesToArgList = instance => {
  const names = findNamedInstanceParents(instance).map(parent => parent.name);
  const args = names.join(', ');

  return args ? `, ${args}` : '';
};

const branchesToArgs = instance => findNamedInstanceParents(instance);
const findBranchByName = name => findChild(child => child.name === name);
const findInstance = instance => findChild(child => child === instance);

function containsName(name = '', instances = []) {
  return instances.filter(instance => {
    return instance.name === name;
  }).length > 0;
}

export default {
  findInstance,
  findBranchByName,
  branchesToArgs,
  branchNamesToArgList,
};
