'use strict';

export default function findImmediateChildren(el, selector) {
  const immediateChildren = [];
  const children = [...el.querySelectorAll(selector)];

  children.reverse().forEach(a => {
    let count = 0;
    children.forEach(b => {
      if (b.contains(a)) {
        count++;
      }
    });

    if (count === 1) {
      immediateChildren.push(a);
    }
  });

  return immediateChildren.reverse();
};
