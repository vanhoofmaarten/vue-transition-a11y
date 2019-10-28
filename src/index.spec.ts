import { mount, config } from '@vue/test-utils';
import { renderToString } from '@vue/server-test-utils';
import TransitionAy11 from './index';
import Child, { TEXT } from './__mocks__/ChildComponent';
import mockWindowMatchMedia from './__mocks__/matchMedia';

// @ts-ignore
config.stubs.transition = false;

describe('Without reduced motion', () => {
  beforeEach(() => {
    mockWindowMatchMedia(false);
  });

  test('It renders transition component', () => {
    const wrapper = mount(TransitionAy11, {
      context: {
        props: {
          name: 'fade',
        },
      },
      slots: {
        default: [Child],
      },
    });

    expect(wrapper.contains(Child)).toBe(true);
    expect(wrapper.props().name).toBe('fade');
    expect(wrapper.text()).toBe(TEXT);
  });
});

describe('With reduced motion', () => {
  beforeEach(() => {
    mockWindowMatchMedia(true);
  });

  test('It does not render a transition component', () => {
    const wrapper = mount(TransitionAy11, {
      context: {
        props: {
          name: 'fade',
        },
      },
      slots: {
        default: [Child],
      },
    });

    expect(wrapper.props().name).not.toBe('fade');
    expect(wrapper.is(Child)).toBe(true);
    expect(wrapper.text()).toBe(TEXT);
  });
});

describe('SSR', () => {
  test('It renders transition component', () => {
    const wrapper = renderToString(TransitionAy11, {
      context: {
        props: {
          name: 'fade',
        },
      },
      slots: {
        default: [Child],
      },
    });

    expect(wrapper).toContain('span');
    expect(wrapper).toContain(TEXT);
  });
});
