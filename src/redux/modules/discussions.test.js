import { List } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { reducer, actions, types, State } from './discussions';

const messages = [
  {
    id: 214,
    issue_id: 4,
    body: "I didn't see you there.",
    created_at: '2017-10-24T15:06:44.000-05:00',
    updated_at: '2017-10-24T15:06:44.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '22b89933-b95e-4ece-83f0-0b7a7c12ed9e',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'matt.raykowski@kineticdata.com',
      name: 'Matt Raykowski',
      guid: 'e16edeb9-9938-4390-8411-059f3c560121',
      company: 'Kinetic Data',
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/e127ae8c7be70841d09bb5a249562c85.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 213,
    issue_id: 4,
    body: 'Hey Norm',
    created_at: '2017-10-24T15:06:37.000-05:00',
    updated_at: '2017-10-24T15:06:37.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '1e0f5cd5-f0d3-4b9b-b3bf-a29676a98302',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'matt.raykowski@kineticdata.com',
      name: 'Matt Raykowski',
      guid: 'e16edeb9-9938-4390-8411-059f3c560121',
      company: 'Kinetic Data',
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/e127ae8c7be70841d09bb5a249562c85.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 212,
    issue_id: 4,
    body: 'yo',
    created_at: '2017-10-24T13:36:32.000-05:00',
    updated_at: '2017-10-24T13:36:32.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '9bb084da-55b5-462d-8300-aa41f360f5c6',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'norm.orstad@kineticdata.com',
      name: 'Norm Orstad',
      guid: 'e988c5c8-7dfc-4c20-bbc7-467f5c800452',
      company: null,
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/8ded4c04eeb322b831e08d7e50b34fbb.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 211,
    issue_id: 4,
    body: 'Yeah it was the good pizza from Grand Ole Creamery',
    created_at: '2017-10-24T13:29:09.000-05:00',
    updated_at: '2017-10-24T13:29:09.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '4db8c3b7-3ea1-4215-a49e-458a136ec521',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'shayne.koestler@kineticdata.com',
      name: 'Shayne Koestler',
      guid: 'd1a4321d-7add-46a9-947f-8ff324e887e8',
      company: null,
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/97f1a50d8087ec3ce72a990bfe42941f.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 210,
    issue_id: 4,
    body: 'Was the food good? I never get any of the food. QQ',
    created_at: '2017-10-24T12:55:11.000-05:00',
    updated_at: '2017-10-24T12:55:11.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '4a997838-e9de-4dec-9873-632566af448d',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'matt.raykowski@kineticdata.com',
      name: 'Matt Raykowski',
      guid: 'e16edeb9-9938-4390-8411-059f3c560121',
      company: 'Kinetic Data',
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/e127ae8c7be70841d09bb5a249562c85.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 209,
    issue_id: 4,
    body: 'Hi Shayne.',
    created_at: '2017-10-24T12:53:53.000-05:00',
    updated_at: '2017-10-24T12:53:53.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '519b2ae0-6f39-4167-906e-18d2810fb23c',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'matt.raykowski@kineticdata.com',
      name: 'Matt Raykowski',
      guid: 'e16edeb9-9938-4390-8411-059f3c560121',
      company: 'Kinetic Data',
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/e127ae8c7be70841d09bb5a249562c85.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 208,
    issue_id: 4,
    body: 'Hello matt',
    created_at: '2017-10-24T12:53:47.000-05:00',
    updated_at: '2017-10-24T12:53:47.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '3c645ddb-e135-4782-9349-e72c12c90587',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'shayne.koestler@kineticdata.com',
      name: 'Shayne Koestler',
      guid: 'd1a4321d-7add-46a9-947f-8ff324e887e8',
      company: null,
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/97f1a50d8087ec3ce72a990bfe42941f.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 207,
    issue_id: 4,
    body: 'And sending messages works too.',
    created_at: '2017-10-23T12:53:37.000-05:00',
    updated_at: '2017-10-23T12:53:37.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '1a3c51a0-9ac0-45b4-99ad-8dd77943dbf1',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'matt.raykowski@kineticdata.com',
      name: 'Matt Raykowski',
      guid: 'e16edeb9-9938-4390-8411-059f3c560121',
      company: 'Kinetic Data',
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/e127ae8c7be70841d09bb5a249562c85.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 206,
    issue_id: 4,
    body:
      "Welcome to Ruby Tuesday, this is Angular but you'll see it in React in just a sec.",
    created_at: '2017-10-23T12:53:04.000-05:00',
    updated_at: '2017-10-23T12:53:04.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '1343037a-8dbc-442d-bfb1-fd4e4022ec0c',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'matt.raykowski@kineticdata.com',
      name: 'Matt Raykowski',
      guid: 'e16edeb9-9938-4390-8411-059f3c560121',
      company: 'Kinetic Data',
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/e127ae8c7be70841d09bb5a249562c85.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
  {
    id: 205,
    issue_id: 4,
    body: 'dd',
    created_at: '2017-10-23T12:38:10.000-05:00',
    updated_at: '2017-10-23T12:38:10.000-05:00',
    messageable_id: null,
    messageable_type: null,
    guid: '8046e0e3-a7ee-4761-9e40-be427b3bbc03',
    action: null,
    type: 'Message',
    url: null,
    frozen_messageable: null,
    tag_list: [],
    user: {
      email: 'matt.raykowski@kineticdata.com',
      name: 'Matt Raykowski',
      guid: 'e16edeb9-9938-4390-8411-059f3c560121',
      company: 'Kinetic Data',
      phone: null,
      title: null,
      avatar_url:
        'https://gravatar.com/avatar/e127ae8c7be70841d09bb5a249562c85.png?d=mm',
    },
    issue: {
      name: 'Administrators',
      guid: 'c25c4375-9037-4012-809d-561d3b4d1b54',
    },
  },
];

const [
  message0,
  message1,
  message2,
  message3,
  message4,
  message5,
  message6,
  message7,
  message8,
  message9,
] = messages;

beforeEach(() => jest.addMatchers(matchers));

describe('discussions redux module', () => {
  describe('reducer', () => {
    test('initializes with default state', () => {
      expect(reducer(undefined, {})).toEqualImmutable(State());
    });

    test('SET_MESSAGES', () => {
      const state = State({ messagesLoading: true });
      const action = actions.setMessages(messages);
      expect(reducer(state, action).messages).toEqualImmutable(
        // first list represents groupings by the date of the message
        // second-level lists represent messages sent by the same person in a
        // sequence because we don't want to show avatars for each one
        // finally, the third-level list contains the actual messages
        List([
          // messages on 10-23-2017, all by the same person
          List([List([message9, message8, message7])]),
          // messages on 10-24-2017, by a combination of people
          List([
            List([message6]),
            List([message5, message4]),
            List([message3]),
            List([message2]),
            List([message1, message0]),
          ]),
        ]),
      );
    });
  });
});
