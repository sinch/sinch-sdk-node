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
});
