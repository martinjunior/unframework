'use strict';

const memo = {};

export default function parseAttributeProps(body, ...args) {
  if (body && !memo[body]) {
    // eslint-disable-next-line no-new-func
    memo[body] = new Function('parent', `'use strict'; return ${body}`);
  }

  try {
    return memo[body](...args);
  } catch (e) {}
};
