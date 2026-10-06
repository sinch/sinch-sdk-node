import { VoiceV2CallbackWebhooks } from '../../../../src';

describe('Voice v2 response creator', () => {
  const pause = {
    command: 'pause' as const,
    durationMilliseconds: 5000,
  };
  const hangup = {
    command: 'hangup' as const,
  };

  describe('incomingCallResponse', () => {
    it('should build an incoming-call response from commands', () => {
      const built = VoiceV2CallbackWebhooks.incomingCallResponse({
        commands: [pause, hangup],
      });

      expect(built).toEqual({
        commands: [pause, hangup],
      });
    });

    it('should map name to callName', () => {
      const built = VoiceV2CallbackWebhooks.incomingCallResponse({
        commands: [pause],
        name: 'incoming',
      });

      expect(built).toEqual({
        commands: [pause],
        callName: 'incoming',
      });
    });

    it('should map onHangup onto events without a call name', () => {
      const built = VoiceV2CallbackWebhooks.incomingCallResponse({
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
      const built = VoiceV2CallbackWebhooks.incomingCallResponse({
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

  describe('response', () => {
    it('should build a response from commands only', () => {
      const built = VoiceV2CallbackWebhooks.response({
        commands: [pause, hangup],
      });

      expect(built).toEqual({
        commands: [pause, hangup],
      });
    });

    it('should allow an empty command list', () => {
      const built = VoiceV2CallbackWebhooks.response({
        commands: [],
      });

      expect(built).toEqual({
        commands: [],
      });
    });
  });
});
