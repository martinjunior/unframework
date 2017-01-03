/**
 * Returns the first valid reference node.
 * A reference node is valid when it is contained by the document.body.
 *
 * @function findReferenceNode
 * @param {HTMLElement[]} nodes
 * @returns {?HTMLElement}
 */
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

/**
 * Determines if the provided node is a valid node reference.
 *
 * @function isValidReferenceNode
 * @param {HTMLElement} node
 * @returns {Boolean}
 */
function isValidReferenceNode(node) {
  return node && document.body.contains(node);
}

/**
 * Returns an array of next siblings.
 * Next siblings are described as the nodes
 * that follow the provided el.
 *
 * @function findNextSiblings
 * @param {HTMLElement} el
 * @param {HTMLElement[]} children
 * @returns {HTMLElement[]} - next siblings
 */
export function findNextSiblings(el, children) {
  const childenArray = [...children];
  return childenArray.slice(childenArray.indexOf(el) + 1, childenArray.length);
}

/**
 * Returns an object containing reference nodes
 * found within the provided el.
 *
 * @function findRefs
 * @param {HTMLElement} el
 * @param {Component[]} children
 * @returns {Object} - element references
 */
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

/**
 * Returns the children found immediately
 * within the provided el. Immediate children are
 * children that are not nested within each other.
 *
 * @function findImmediateChildren
 * @param {HTMLElement} el
 * @param {String} selector
 * @returns {HTMLElement[]} - immediate children
 */
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
