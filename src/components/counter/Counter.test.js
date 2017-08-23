import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Counter } from './Counter';

describe('<Counter />', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      dec: jest.fn(),
      inc: jest.fn(),
      double: jest.fn(),
      counter: 0,
    };
    component = shallow(<Counter {...props} />);
  });

  test('verify snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  describe('decrement button', () => {
    let button;

    beforeEach(() => {
      button = component.find('.decButton').first();
    });

    test('should be rendered', () => {
      expect(button).toBeDefined();
    });

    test('should call the "dec" prop function when clicked', () => {
      button.simulate('click');

      expect(props.dec).toBeCalled();
    });

    test('should have "-" as a label', () => {
      expect(button.text()).toEqual('-');
    });
  });

  describe('increment button', () => {
    let button;

    beforeEach(() => {
      button = component.find('.incButton').first();
    });

    test('should be rendered', () => {
      expect(button).toBeDefined();
    });

    test('should call the "inc" prop function when clicked', () => {
      button.simulate('click');
      expect(props.inc).toBeCalled();
    });

    test('should have "+" as a label', () => {
      expect(button.text()).toEqual('+');
    });
  });

  describe('double button', () => {
    let button;

    beforeEach(() => {
      button = component.find('.dblButton').first();
    });

    test('should be rendered', () => {
      expect(button).toBeDefined();
    });

    test('should call the "double" prop function when clicked', () => {
      button.simulate('click');
      expect(props.double).toBeCalled();
    });

    test('should have "* 2" as a label', () => {
      expect(button.text()).toEqual('* 2');
    });
  });
});
