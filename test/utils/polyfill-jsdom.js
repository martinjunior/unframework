/**
  * Convert data-attr into key
  * data-foo-bar -> fooBar
  * @param {String} val
  * @returns {String}
  */
const _attrToDataKey = val => {
  const out = val.substr(5);
  return out.split('-').map((part, inx) => {
    if (!inx) {
      return part;
    }
    return part.charAt(0).toUpperCase() + part.substr(1);
  })
  .join('');
};

/**
 * Produce dataset object emulating behavior of el.dataset
 * @param {Element} el
 * @returns {Object}
 */
const _getNodeDataAttrs = el => {
  let i = 0;
  let attr;
  let datakey;
  const atts = el.attributes;
  const len = atts.length;
  const _datasetMap = [];
  // represents el.dataset
  const proxy = {};
  for (; i < len; i++) {
    attr = atts[i].nodeName;
    if (attr.indexOf('data-') === 0) {
      datakey = _attrToDataKey(attr);
      if (typeof _datasetMap[ datakey ] !== 'undefined') {
        break;
      }
      _datasetMap[ datakey ] = atts[ i ].nodeValue;
      (function(datakey) {
        // every data-attr found on the element makes a getter and setter
        Object.defineProperty(proxy, datakey, {
          enumerable: true,
          configurable: true,
          get() {
            return  _datasetMap[ datakey ];
          },
          set(val) {
            _datasetMap[ datakey ] = val;
            el.setAttribute(attr, val);
          },
        });
      }(datakey));
    }
  }
  return proxy;
};

Object.defineProperty(global.window.Element.prototype, 'dataset', {
  get() {
    return _getNodeDataAttrs(this);
  },
});
