'use strict';

export default function differentiate(target, source, onMatchFound = () => {}) {
  const difference = {};

  Object.keys(source).forEach(key => {
    if (target[key]) {
      onMatchFound(key);
    }

    difference[key] = source[key];
  });

  return difference;
};
