export default function findRefs(element, children) {
  const refs = {};

  [...element.querySelectorAll('[data-ref]')]
    .filter(element => {
      return children
        .filter(child => child.element.contains(element))
        .length === 0;
    })
    .forEach(element => {
      refs[element.dataset.ref] = element;
    });

  return refs;
};
