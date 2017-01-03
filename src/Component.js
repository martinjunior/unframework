import createParser from './createParser';
import { findRefs, findImmediateChildren } from './utils';
import tree from './tree';

/**
 * A base component that
 * mimics React's lifecycle.
 *
 * @class Component
 * @constructor
 * @param {HTMLElement} el
 * @param {?Component} parent
 */
export default class Component {
  constructor(el, parent = null) {
    /**
     * The element used to instantiate the component.
     *
     * @property {HTMLElement} component.el
     */
    this.el = el;
    /**
     * A name to refer the the component by. The name
     * comes from the component attribute
     * (e.g., [data-component="Constructor as name"]).
     *
     * @property {String} component.name
     */
    this.name = null;
    /**
     * The components state. This should only be
     * changed via component.setState() hereafter.
     *
     * @property {Object} component.state
     * @default {}
     */
    this.state = {};
    /**
     * Element references immediate
     * contained by component.el.
     *
     * @property {Object} component.refs
     * @default {}
     */
    this.refs = {};
    /**
     * The component's parent.
     *
     * @property {?Component} component.parent
     * @default null
     */
    this.parent = parent;
    /**
     * The component's children
     * (an array of Components).
     *
     * @property {Object[]} component.children
     * @default []
     */
    this.children = [];
    /**
     * Determines whether or not
     * the component has/is mounted.
     *
     * @property {Boolean} component._isMounted
     * @default false
     * @protected
     */
    this._isMounted = false;
    /**
     * The components props. These are
     * typically received from parent components.
     *
     * @property {Object} component.props
     * @default {}
     */
    this.props = Object.assign({}, this.constructor.defaultProps);
    /**
     * A function that parses the
     * components [data-props] attribute.
     *
     * @property {Object} component.parse
     * @default {}
     */
    this.parse = createParser(
      `return ${this.el.dataset.props}`,
      'parent, loop'.concat(tree.branchNamesToArgList(this))
    );
  }

  /**
   * Takes a new state and triggers
   * the relevant lifecyle methods.
   *
   * @method component.acceptState
   * @param {Object} nextState
   */
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

  /**
   * Update the state and trigger
   * the relevant lifecyle methods.
   *
   * @method component.setState
   * @param {Object} nextState
   */
  setState(nextState) {
    this.acceptState(nextState);
  }

  /**
   * Unmount the component setting
   * it up to be remounted.
   *
   * @method component.unmount
   */
  unmount() {
    this._isMounted = false;
    this.componentWillUnmount();
    this.children.forEach(child => child.unmount());
  }

  /**
   * Destroy the component.
   *
   * @method component.destroy
   */
  destroy() {
    this.children.forEach(child => child.destroy());
  }

  /**
   * Indicates whether the component's
   * children should be automatically mounted.
   * If false, the component is expected to mounted
   * its own children.
   *
   * @method component.shouldMountChildren
   * @return {Boolean}
   */
  shouldMountChildren() { return true; }

  /**
   * Triggers just before the components initial render.
   *
   * @method component.componentWillMount
   */
  componentWillMount() {}

  /**
   * Triggers just after the components initial render.
   *
   * @method component.componentDidMount
   */
  componentDidMount() {}

  /**
   * Triggers before the component will received props.
   * This happens everytime a parent component calls acceptState().
   *
   * @method component.componentWillReceiveProps
   */
  componentWillReceiveProps() {}

  /**
   * Determines whether the component should update.
   * If false, the component's render method won't be called.
   *
   * @method component.shouldComponentUpdate
   * @return {Boolean}
   */
  shouldComponentUpdate() { return true; }

  /**
   * Triggers just before the component will update (render()).
   *
   * @method component.componentWillUpdate
   */
  componentWillUpdate() {}

  /**
   * Triggers just after the component updated (render()).
   *
   * @method component.componentDidUpdate
   */
  componentDidUpdate() {}

  /**
   * Triggers just before the component unmounts.
   *
   * @method component.componentWillUnmount
   */
  componentWillUnmount() {}

  /**
   * Where DOM manipulation goes. Triggered when
   * the component should update.
   *
   * @method component.render
   * @param {Object} props
   * @param {Object} state
   */
  render(props, state) {}

  /**
   * @property Component.defaultProps
   * @type {Object}
   */
  static defaultProps = {}
}
