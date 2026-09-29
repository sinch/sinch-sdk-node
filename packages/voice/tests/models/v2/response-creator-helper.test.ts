import { Voice } from '../../../src';

describe('Voice v2 dedicated response creator helper', () => {
  const pause: Voice.v2.PauseCommand = {
    command: 'pause',
    durationMilliseconds: 5000,
  };
  const hangup: Voice.v2.HangupCommand = {
    command: 'hangup',
  };

  describe('responseCreatorHelper.incomingCallResponse', () => {
    it('should build an incoming-call response from commands', () => {
      const built = Voice.v2.responseCreatorHelper.incomingCallResponse({
        commands: [pause, hangup],
      });

      const expected: Voice.v2.WebhookResponse = {
        commands: [pause, hangup],
      };
      expect(built).toEqual(expected);
    });

    it('should map name to callName', () => {
      const built = Voice.v2.responseCreatorHelper.incomingCallResponse({
        commands: [pause],
        name: 'incoming',
      });

      expect(built).toEqual({
        commands: [pause],
        callName: 'incoming',
      });
    });

    it('should map onHangup onto events without a call name', () => {
      const built = Voice.v2.responseCreatorHelper.incomingCallResponse({
        commands: [pause],
        onHangup: [hangup],
      });

      expect(built).toEqual({
        commands: [pause],
        events: {
          onHangup: [hangup],
        },
      });
    });

    it('should map name and onHangup together', () => {
      const built = Voice.v2.responseCreatorHelper.incomingCallResponse({
        commands: [pause, hangup],
        name: 'incoming',
        onHangup: [hangup],
      });

      expect(built).toEqual({
        commands: [pause, hangup],
        callName: 'incoming',
        events: {
          onHangup: [hangup],
        },
      });
    });
  });

  describe('responseCreatorHelper.response', () => {
    it('should build a response from commands only', () => {
      const built = Voice.v2.responseCreatorHelper.response({
        commands: [pause, hangup],
      });

      const expected: Voice.v2.WebhookResponse = {
        commands: [pause, hangup],
      };
      expect(built).toEqual(expected);
    });

    it('should allow an empty command list', () => {
      const built = Voice.v2.responseCreatorHelper.response({
        commands: [],
      });

      expect(built).toEqual({
        commands: [],
      });
    });
  });
});
