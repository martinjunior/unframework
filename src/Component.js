import createParser from './createParser';
import { findRefs, findImmediateChildren } from './utils';
import tree from './tree';

export default class Component {
  constructor(el, parent = null) {
    this.el = el;
    this.state = {};
    this.refs = {};
    this.parent = parent;
    this.children = [];
    this._isMounted = false;
    this.props = Object.assign({}, this.constructor.defaultProps);
    this.parse = createParser(
      `return ${this.el.dataset.props}`,
      'parent, loop'.concat(tree.branchNamesToArgList(this))
    );
  }

  acceptState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
    const nextProps = Object.assign({}, this.props,
      this.parse(this.parent, this.loop, ...tree.branchesToArgs(this))
    );

    if (this._isMounted === false) {
      this.props = nextProps;
      this.componentWillMount();
      this.refs = findRefs(this.el, this.children);
      this.render(this.props, this.state);
      this._isMounted = true;
      this.componentDidMount();
    } else {
      this.componentWillReceiveProps(nextProps);
      this.props = nextProps;
      if (this.shouldComponentUpdate() === false) {
        return;
      }
      this.componentWillUpdate();
      this.render(this.props, this.state);
      this.componentDidUpdate();
    }

    this.children.forEach(child => child.acceptState());
  }

  setState(nextState) {
    this.acceptState(nextState);
  }

  unmount() {
    this._isMounted = false;
    this.componentWillUnmount();
    this.children.forEach(child => child.unmount());
  }

  destroy() {
    this.children.forEach(child => child.destroy());
  }

  shouldMountChildren() { return true; }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  shouldComponentUpdate() { return true; }
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {}

  static defaultProps = {}
}
