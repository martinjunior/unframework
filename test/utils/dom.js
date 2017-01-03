import jsdom from 'jsdom';

export default cb => {
  jsdom.env({
    html: '<!doctype html><html><body data-test="cool"></body></html>',
    done(err, window) {
      global.window = window;
      global.document = window.document;
      require('./polyfill-jsdom');
      cb();
    },
  });
};
