export function findReferenceNode(nodes = []) {
  let ref = null;

  nodes.some(node => {
    const isValid = isValidReferenceNode(node);

    if (isValid) {
      ref = node;
    }

    return isValid;
  });

  return ref;
}

function isValidReferenceNode(node) {
  return node && document.body.contains(node);
}

export function findNextSiblings(el, children) {
  const childenArray = [...children];
  return childenArray.slice(childenArray.indexOf(el), childenArray.length);
}


export function findRefs(el, children) {
  const refs = {};

  [...el.querySelectorAll('[data-ref]')]
    .filter(el => {
      return children
        .filter(child => Boolean(child.el.dataset.component))
        .filter(child => child.el.contains(el))
        .length === 0;
    })
    .forEach(el => {
      refs[el.dataset.ref] = el;
    });

  return refs;
}

export function findImmediateChildren(el, selector) {
  const immediateChildren = [];
  const children = [...el.querySelectorAll(selector)];

  children.reverse().forEach(a => {
    if (children.filter(b => {
      return b.contains(a);
    }).length === 1) {
      immediateChildren.push(a);
    }
  });

  return immediateChildren.reverse();
}
