import Component from './Component';
import EachItemComponent from './EachItemComponent';
import createParser from './createParser';
import { mountChildren } from './mount';
import { findNextSiblings, findReferenceNode, findImmediateChildren } from './utils';
import tree from './tree';

let count = 0;

export default class EachComponent extends Component {
  constructor(...args) {
    super(...args);

    this._id = `${count++}`;
    this.parentNode = this.el.parentNode;
    this.nextSiblings = findNextSiblings(this.el, this.parentNode.children);
    this.parse = createParser(
      `return ${this.el.dataset.each}`,
      'parent'.concat(tree.branchNamesToArgList(this))
    );
  }

  shouldMountChildren() {
    return this._isMounted;
  }

  acceptState(nextState) {
    const items = EachComponent.each(this.parse(this.parent, ...tree.branchesToArgs(this)));

    if (this._isMounted === false) {
      this.parentNode.removeChild(this.el);
      this._isMounted = true;
    }

    this.cleanup();
    this.render(items);
    this.children.forEach(child => child.acceptState());
  }

  cleanup() {
    this.children.forEach(child => {
      child.unmount();
      // TODO: find out if this is needed
      if (child.cleanup) {
        child.cleanup();
      }
      child.destroy();
    });

    this.children = [];

    [...this.parentNode.querySelectorAll(`[data-each-id="${this._id}"]`)]
      .forEach(child => this.parentNode.removeChild(child));
  }

  render(items) {
    const fragment = document.createDocumentFragment();

    items.forEach(loop => {
      const clone = this.el.cloneNode(true);
      clone.dataset.eachId = this._id;
      const eachItem = new EachItemComponent(clone, this);

      mountChildren(clone, eachItem, child => {
        return Object.assign(child, {
          loop,
        });
      });

      this.children.push(eachItem);
      fragment.appendChild(clone);
    });

    this.parentNode.insertBefore(fragment, findReferenceNode(this.nextSiblings));
  }

  unmount() {
    // put things back in place so that we can remount
    this.parentNode.insertBefore(this.el, findReferenceNode(this.nextSiblings));
    super.unmount();
  }

  static each(items = []) {
    return Object.keys(items)
      .map(key => {
        return {
          key,
          val: items[key],
        };
      });
  }
}
