import { assert, expect } from 'chai';
// TODO: find a way to reset registry for every test
import registry from './../src/registry';

describe('registry.js', () => {
  it('registers and finds components', () => {
    const one = 'one';
    const two = 'one';
    const three = 'one';
    const other = 'other';
    registry.register({ one, two, three });

    assert(registry.find(one) === one, 'component was not registered');
    assert(registry.find(two) === two, 'component was not registered');
    assert(registry.find(three) === three, 'component was not registered');
  });

  it('overriddes components', () => {
    const One = {
      a: 1,
      b: {
        c: 2,
      },
    };
    const Two = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };
    registry.register({ One });
    assert.deepEqual(registry.find('One'), One, 'components are not equal');
    registry.register({ One: Two });
    assert.deepEqual(registry.find('One'), Two, 'component was not overridden');
  });
});
