import merge from './utilities/merge';
import findRefs from './utilities/findRefs';
import parseAttributeProps from './utilities/parseAttributeProps';

export default class Component {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.children = [];
    this.state = {};
    this.refs = {};
    this._attrProps = element.dataset.props;
    this.props = merge(
      this.constructor.defaultProps,
      parseAttributeProps(
        this.element.dataset.componentId,
        this._attrProps,
        this.parent
      )
    );
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate() { return true; }

  componentWillUpdate() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render(props, state) {}

  setState(newState) {
    this.state = merge(this.state, newState);
    this._update();
  }

  _init(children) {
    this.refs = findRefs(this.element, this.children);
    this.componentWillMount();
    const nextProps = merge(
      this.props,
      parseAttributeProps(
        this.element.dataset.componentId,
        this._attrProps,
        this.parent
      )
    );
    this.props = nextProps;
    this.render(nextProps, this.state);
    this.componentDidMount();
  }

  _update() {
    const nextProps = merge(
      this.props,
      parseAttributeProps(
        this.element.dataset.componentId,
        this._attrProps,
        this.parent
      )
    );
    this.componentWillReceiveProps(nextProps);
    this.props = nextProps;

    if (this.shouldComponentUpdate() === false) {
      return;
    }

    this.componentWillUpdate();
    this.render(this.props, this.state);
    this.componentDidUpdate();
    this.children.forEach(child => child._update());
  }
}

Component.defaultProps = {};
