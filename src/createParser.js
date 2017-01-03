/**
 * Returns a parser function meant to parse
 * element attributes (.e.g., [data-each="parent.state.items"])
 *
 * @param  {String} body
 * @param  {Object[]} args
 * @return {Function}
 */
export default function createParser(body, ...args) {
  // eslint-disable-next-line no-new-func
  return new Function(...args,
    `try {
      ${body};
    } catch (e) {}`);
};
