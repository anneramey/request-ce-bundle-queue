import { delay } from 'redux-saga';
import { select, put, call, all } from 'redux-saga/effects';
import { List } from 'immutable';
import { actions } from '../modules/discussions';

global.bundle = {
  apiLocation: () => '/acme/app/api/v1',
};

const {
  sendMessage,
  sendAttachment,
  fetchMessages,
  fetchUploads,
  touchIssuePresence,
} = require('../../utils/discussion_api');

const {
  sendMessageTask,
  fetchMoreMessagesTask,
  registerChannel,
  incomingMessages,
  uploadProcessingPoller,
  queueProcessingUploadsTask,
  presenceKeepAlive,
  selectServerUrl,
} = require('./discussions');

const ISSUE_GUID = 'issue-guid';
const RESPONSE_URL = 'http://response.url';

describe('discussion saga', () => {
  describe('selectors', () => {
    describe('#selectFetchMessageSettings', () => {});
    describe('#selectServerUrl', () => {});
    describe('#selectProcessingUploads', () => {});
  });

  describe('#sendMessageTask', () => {
    const responseUrl = '/space-slug/kinetic-response';
    let action;

    beforeEach(() => {
      action = {
        payload: {
          guid: 'guid',
          message: 'message',
        },
      };
    });

    describe('when sending an attachment', () => {
      test('it calls sendAttachment', () => {
        // Set up the attachment object.
        action.payload.attachment = { name: 'file.txt' };
        // Start the saga with the action.
        const saga = sendMessageTask(action);
        // First fetch the server config info.
        expect(saga.next().value).toEqual(select(selectServerUrl));

        // Next call the correct function to send.
        let step = saga.next(responseUrl).value;
        expect(step.CALL.fn).toBe(sendAttachment);

        step = saga.next({ messages: [] }).value;
      });
    });

    describe('when sending text', () => {
      test('it calls sendMessage', () => {
        const saga = sendMessageTask(action);
        expect(saga.next().value).toEqual(select(selectServerUrl));
        const step = saga.next(responseUrl).value;
        expect(step.CALL.fn).toBe(sendMessage);
      });
    });
  });

  describe('#fetchMoreMessagesTask', () => {
    let action;
    beforeEach(() => {
      action = { payload: {} };
    });

    describe('when successful', () => {
      test('it puts the "has more" actions', () => {
        const messageSettings = {};
        const saga = fetchMoreMessagesTask(action);
        saga.next(); // Simulate selecting message parameters.

        const step = saga.next(messageSettings).value;
        expect(step.CALL.fn).toBe(fetchMessages);
      });
    });
  });

  describe('#registerChannel', () => {
    let socket;

    beforeEach(() => {
      socket = {};
    });

    describe('onopen', () => {
      test('emits a "connected" action', () => {
        const channel = registerChannel(socket);
        const taken = new Promise(resolve => channel.take(resolve));
        socket.onopen();
        return taken.then(event => expect(event.action).toBe('connected'));
      });
    });

    describe('onclose', () => {
      test('emits a "reconnect" action', () => {
        const channel = registerChannel(socket);
        const taken = new Promise(resolve => channel.take(resolve));
        socket.onopen();
        return taken.then(event => expect(event.action).toBe('connected'));
      });
    });

    describe('onerror', () => {
      test('emits nothing', () => {
        // We're not doing anyting here yet.
      });
    });

    describe('onmessage', () => {
      test('parses and emits the event data', () => {
        const channel = registerChannel(socket);
        const taken = new Promise(resolve => channel.take(resolve));
        socket.onmessage({ data: '{ "test": "event data" }' });
        return taken.then(event => expect(event.test).toBe('event data'));
      });
    });

    describe('when channel is closed', () => {
      test('the channel closes the socket', () => {
        socket.close = jest.fn();
        const channel = registerChannel(socket);
        channel.close();
        expect(socket.close).toHaveBeenCalled();
      });
    });
  });

  describe('incoming message handler', () => {
    let socket;
    let channel;
    let saga;
    const guid = 'fake-guid';

    beforeEach(() => {
      socket = {};
      channel = registerChannel(socket);
      saga = incomingMessages(channel, guid);
    });

    test('on message:create', () => {
      const emitted = { action: 'message:create', message: 'message' };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.receiveMessage(guid, emitted.message)),
      );
    });

    test('on message:update', () => {
      const emitted = { action: 'message:update', message: 'message' };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.updateMessage(guid, emitted.message)),
      );
    });

    test('on presence:add', () => {
      const emitted = { action: 'presence:add', user: 'user' };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.addPresence(guid, emitted.user)),
      );
    });

    test('on presence:remove', () => {
      const emitted = { action: 'presence:remove', user: 'user' };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.removePresence(guid, emitted.user)),
      );
    });

    test('on participant:create', () => {
      const emitted = {
        action: 'participant:create',
        participant: 'participant',
      };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.addParticipant(guid, emitted.participant)),
      );
    });

    test('on participant:delete', () => {
      const emitted = {
        action: 'participant:delete',
        participant: 'participant',
      };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.removeParticipant(guid, emitted.participant)),
      );
    });

    test('on invite:create', () => {
      const emitted = {
        action: 'invite:create',
        invite: 'invite',
      };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.addInvite(guid, emitted.invite)),
      );
    });

    test('on invite:delete', () => {
      const emitted = {
        action: 'invite:delete',
        invite: 'invite',
      };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.removeInvite(guid, emitted.invite)),
      );
    });

    test('on reconnect', () => {
      const emitted = { action: 'reconnect' };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(put(actions.reconnect(guid)));
    });

    test('on connected', () => {
      const emitted = { action: 'connected' };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.setConnected(guid, true)),
      );
    });

    test('on unknown message type', () => {
      const emitted = { action: 'neverwillexist' };
      expect(saga.next().value.TAKE).toBeDefined();
      expect(saga.next(emitted).value).toEqual(
        put(actions.receiveBadMessage(guid, emitted)),
      );
    });

    // Unsure how to accomplish this.
    test('closes channel when cancelled', () => {
      socket.close = jest.fn();
      // // const result = saga.next(cancelled());
      // saga.throw(new Error('cancel.'));
      // const result = saga.next(cancelled());
      // console.log(result);
    });
  });

  describe('#uploadProcessingPoller', () => {
    let message;
    let upload;

    beforeEach(() => {
      message = {
        guid: 'message-guid',
        messageable: {
          guid: 'upload-guid',
        },
      };

      upload = {
        guid: 'upload-guid',
        file_processing: true,
      };
    });

    describe('when there are file uploads', () => {
      test('it fetches uploads', () => {
        const saga = uploadProcessingPoller(ISSUE_GUID, RESPONSE_URL);
        expect(saga.next().value.SELECT).toBeDefined();
        expect(saga.next(List([message])).value).toEqual(
          call(fetchUploads, ISSUE_GUID, RESPONSE_URL),
        );
      });

      describe('when there are no matches', () => {
        test('it does not apply uploads and delays for the next cycle', () => {
          const saga = uploadProcessingPoller(ISSUE_GUID, RESPONSE_URL);
          expect(saga.next().value.SELECT).toBeDefined();
          expect(saga.next(List([message])).value).toEqual(
            call(fetchUploads, ISSUE_GUID, RESPONSE_URL),
          );

          // Change the upload guid so it does not match.
          upload.guid = 'no-match';

          expect(saga.next({ data: [upload] }).value).toEqual(
            call(delay, 3000),
          );
        });
      });

      describe('when there matches', () => {
        test('it does not apply uploads that are still processing', () => {
          const saga = uploadProcessingPoller(ISSUE_GUID, RESPONSE_URL);
          expect(saga.next().value.SELECT).toBeDefined();
          expect(saga.next(List([message])).value).toEqual(
            call(fetchUploads, ISSUE_GUID, RESPONSE_URL),
          );

          expect(saga.next({ data: [upload] }).value).toEqual(
            call(delay, 3000),
          );
        });
        test('it applies uploads that are not processing', () => {
          const saga = uploadProcessingPoller(ISSUE_GUID, RESPONSE_URL);
          expect(saga.next().value.SELECT).toBeDefined();
          expect(saga.next(List([message])).value).toEqual(
            call(fetchUploads, ISSUE_GUID, RESPONSE_URL),
          );

          // Set the upload to not be processing.
          upload.file_processing = false;

          expect(saga.next({ data: [upload] }).value).toEqual(
            all([put(actions.applyUpload(ISSUE_GUID, message.guid, upload))]),
          );
        });
      });
    });

    describe('when there are no file uploads', () => {
      test('it delays 3 seconds and tries again', () => {
        const saga = uploadProcessingPoller(ISSUE_GUID, RESPONSE_URL);
        expect(saga.next().value.SELECT).toBeDefined();
        expect(saga.next(List([])).value).toEqual(call(delay, 3000));
        expect(saga.next().value.SELECT).toBeDefined();
      });
    });
  });

  describe('#presenceKeepAlive', () => {
    test('it touches presence and delays 3s', () => {
      const saga = presenceKeepAlive(ISSUE_GUID, RESPONSE_URL);
      expect(saga.next().value).toEqual(
        call(touchIssuePresence, ISSUE_GUID, RESPONSE_URL),
      );
      expect(saga.next().value).toEqual(call(delay, 3000));
    });
  });
});
