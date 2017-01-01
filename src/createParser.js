export default function createParser(body, ...args) {
  // eslint-disable-next-line no-new-func
  return new Function(...args, `
    try {
      ${body};
    } catch (e) {

    }`);
};
