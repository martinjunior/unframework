'use strict';

export default function merge(...sources) {
  return Object.assign({}, ...sources);
};
