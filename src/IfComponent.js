import Component from './Component';
import createParser from './createParser';
import { findNextSiblings, findReferenceNode } from './utils';
import tree from './tree';

export default class IfComponent extends Component {
  constructor(...args) {
    super(...args);

    this._isAttached = null;
    this.parentNode = this.el.parentNode;
    this.nextSiblings = findNextSiblings(this.el, this.parentNode.children);
    this.parse = createParser(
      `return ${this.el.dataset.if}`,
      'parent, loop'.concat(tree.branchNamesToArgList(this))
    );
  }

  acceptState(nextState) {
    const shouldAttach = this.parse(this.parent, this.loop, ...tree.branchesToArgs(this));

    if (this._isAttached !== shouldAttach) {
      this.render(shouldAttach);
      this._isAttached = shouldAttach;
    }

    if (!this._isAttached) {
      return;
    }

    this.children.forEach(child => child.acceptState());
  }

  render(shouldAttach) {
    if (shouldAttach) {
      this.attach();

      return;
    }

    this.detach();
  }

  attach() {
    const referenceNode = findReferenceNode(this.nextSiblings);
    this.parentNode.insertBefore(this.el, referenceNode);
  }

  detach() {
    this.parentNode.removeChild(this.el);
    super.unmount();
  }
}
