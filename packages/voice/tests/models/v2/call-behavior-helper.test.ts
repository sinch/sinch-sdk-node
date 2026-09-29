import { Voice } from '../../../src';

describe('Voice v2 dedicated services helper', () => {
  const pause: Voice.v2.PauseCommand = {
    command: 'pause',
    durationMilliseconds: 5000,
  };
  const hangup: Voice.v2.HangupCommand = {
    command: 'hangup',
  };

  describe('callBehaviorHelper.static', () => {
    it('should build a static call behavior from commands', () => {
      const built = Voice.v2.callBehaviorHelper.static({
        commands: [pause, hangup],
      });

      const expected: Voice.v2.CallBehaviorsStatic = {
        type: 'STATIC',
        static: {
          commands: [pause, hangup],
        },
      };
      expect(built).toEqual(expected);
    });

    it('should map name to callName', () => {
      const built = Voice.v2.callBehaviorHelper.static({
        commands: [pause],
        name: 'incoming',
      });

      expect(built).toEqual({
        type: 'STATIC',
        static: {
          commands: [pause],
          callName: 'incoming',
        },
      });
    });

    it('should map onHangup onto events without a call name', () => {
      const built = Voice.v2.callBehaviorHelper.static({
        commands: [pause],
        onHangup: [hangup],
      });

      expect(built).toEqual({
        type: 'STATIC',
        static: {
          commands: [pause],
          events: {
            onHangup: [hangup],
          },
        },
      });
    });

    it('should map name and onHangup together', () => {
      const built = Voice.v2.callBehaviorHelper.static({
        commands: [pause, hangup],
        name: 'incoming',
        onHangup: [hangup],
      });

      expect(built).toEqual({
        type: 'STATIC',
        static: {
          commands: [pause, hangup],
          callName: 'incoming',
          events: {
            onHangup: [hangup],
          },
        },
      });
    });
  });

  describe('callBehaviorHelper.none', () => {
    it('should build a none call behavior', () => {
      const built: Voice.v2.CallBehaviorsNone = Voice.v2.callBehaviorHelper.none();

      expect(built).toEqual({
        type: 'NONE',
      });
    });
  });

  describe('callBehaviorHelper.webhook', () => {
    it('should build a webhook call behavior from a url', () => {
      const built = Voice.v2.callBehaviorHelper.webhook({
        url: 'https://mi-backend.com/voice/events',
      });

      const expected: Voice.v2.CallBehaviorsWebhook = {
        type: 'WEBHOOK',
        webhook: {
          url: 'https://mi-backend.com/voice/events',
        },
      };
      expect(built).toEqual(expected);
    });

    it('should include fallbackUrl when provided', () => {
      const built = Voice.v2.callBehaviorHelper.webhook({
        url: 'https://mi-backend.com/voice/events',
        fallbackUrl: 'https://backup.mi-backend.com/voice/events',
      });

      expect(built).toEqual({
        type: 'WEBHOOK',
        webhook: {
          url: 'https://mi-backend.com/voice/events',
          fallbackUrl: 'https://backup.mi-backend.com/voice/events',
        },
      });
    });
  });
});
