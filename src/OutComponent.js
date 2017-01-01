import Component from './Component';
import createParser from './createParser';
import { findNextSiblings, findReferenceNode } from './utils';
import tree from './tree';

export default class OutComponent extends Component {
  constructor(...args) {
    super(...args);

    this.parse = createParser(
      `return ${this.el.dataset.out}`,
      'parent, loop'.concat(tree.branchNamesToArgList(this))
    );
  }

  acceptState(nextState) {
    const mods = this.parse(this.parent, this.loop, ...tree.branchesToArgs(this));

    this.render(mods);
    this.children.forEach(child => child.acceptState());
  }

  render(mods) {
    Object.assign(this.el, mods);
  }
}
