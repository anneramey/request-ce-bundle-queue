import React from 'react';
import { shallow } from 'enzyme';

import { QueueItemDetails } from './QueueItemDetails';

describe('<QueueItemDetails />', () => {
  let props;

  beforeEach(() => {
    props = {
      queueItem: {
        id: 'id',
        handle: 'handle',
        coreState: 'Draft',
        values: {
          Summary: 'this is the summary',
        },
        form: {
          name: 'test form',
        },
        children: [],
      },
      isAssigning: false,
      toggleAssigning: jest.fn(),
      setIsAssigning: jest.fn(),
      setAssignment: jest.fn(),
      assignments: [],
      openNewItemMenu: jest.fn(),
      prohibitSubtasks: false,
    };
  });

  test('snapshot', () => {
    const wrapper = shallow(<QueueItemDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  describe('View Original Item action button', () => {
    describe('when there is no parent', () => {
      test('it does not render the button', () => {
        props.queueItem.parent = null;
        props.queueItem.origin = null;
        const wrapper = shallow(<QueueItemDetails {...props} />);
        expect(wrapper.find('a.request-button')).toHaveLength(0);
      });
    });

    describe('when the parent and origin are the same', () => {
      test('it renders the button with the appropriate text', () => {
        props.queueItem.parent = { id: 'id1' };
        props.queueItem.origin = { id: 'id1' };
        const wrapper = shallow(<QueueItemDetails {...props} />);
        const originButton = wrapper.find('.request-button');
        expect(originButton).toHaveLength(1);
        expect(originButton.first().text()).toBe('View Original Request');
        expect(originButton.first().prop('href')).toContain(
          props.queueItem.origin.id,
        );
      });
    });

    describe('when the parent and origin are not the same', () => {
      test('it renders the button with the appropriate text', () => {
        props.queueItem.parent = { id: 'id2' };
        props.queueItem.origin = { id: 'id1' };
        const wrapper = shallow(<QueueItemDetails {...props} />);
        const originButton = wrapper.find('.request-button');
        expect(originButton).toHaveLength(1);
        expect(originButton.first().prop('children')).toBe('View Parent');
        expect(originButton.first().prop('to')).toContain(
          props.queueItem.parent.id,
        );
      });
      test('it still renders if origin is null', () => {
        props.queueItem.parent = { id: 'id2' };
        props.queueItem.origin = null;
        const wrapper = shallow(<QueueItemDetails {...props} />);
        const originButton = wrapper.find('.request-button');
        expect(originButton).toHaveLength(1);
        expect(originButton.first().prop('children')).toBe('View Parent');
        expect(originButton.first().prop('to')).toContain(
          props.queueItem.parent.id,
        );
      });
    });
  });
});
