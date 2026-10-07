import { Voice } from '../../../src';

describe('Voice v2 destination helper', () => {
  const { Destination } = Voice.v2;

  describe('phone', () => {
    it('should build a phone destination from a number', () => {
      const destination = Destination.phone('+15550001111');

      expect(destination).toBeInstanceOf(Voice.v2.DestinationPhone);
      expect(destination).toEqual({
        type: 'PHONE',
        phone: {
          number: '+15550001111',
        },
      });
    });
  });

  describe('sip', () => {
    it('should copy the endpoint and optional fields as given', () => {
      const destination = Destination.sip({
        endpoint: 'sips:user@example.com',
        transport: 'TCP',
        callHeaders: [{
          key: 'X-Call',
          value: '1',
        }],
      });

      expect(destination).toBeInstanceOf(Voice.v2.DestinationSip);
      expect(destination).toBeInstanceOf(Voice.v2.GenericSipEndpoint);
      expect(destination).toBeInstanceOf(Voice.v2.SipEndpoint);
      expect(destination).toEqual({
        type: 'SIP',
        sip: {
          endpoint: 'sips:user@example.com',
          transport: 'TCP',
          callHeaders: [{
            key: 'X-Call',
            value: '1',
          }],
        },
      });
    });

    it('should leave an endpoint without a scheme unchanged', () => {
      const destination = Destination.sip({
        endpoint: 'user@example.com',
      });

      expect(destination.sip).toEqual({
        endpoint: 'user@example.com',
      });
    });
  });

  describe('sipFrom', () => {
    it('should copy the endpoint and a display name', () => {
      const destination = Destination.sipFrom({
        endpoint: 'sip:user@example.com',
        displayName: 'Alice',
      });

      expect(destination).toBeInstanceOf(Voice.v2.DestinationSipFrom);
      expect(destination).toBeInstanceOf(Voice.v2.GenericSipEndpoint);
      expect(destination).toBeInstanceOf(Voice.v2.SipEndpoint);
      expect(destination).toEqual({
        type: 'SIP',
        sip: {
          endpoint: 'sip:user@example.com',
          displayName: 'Alice',
        },
      });
    });
  });

  describe('stream and voiceRelay', () => {
    it('should set only the stream endpoint', () => {
      const destination = Destination.stream('wss://example.com/audio');

      expect(destination).toEqual({
        type: 'STREAM',
        stream: {
          endpoint: 'wss://example.com/audio',
        },
      });
    });

    it('should copy stream options and call headers', () => {
      const destination = Destination.stream({
        endpoint: 'wss://example.com/audio',
        streamOptions: {
          codec: 'PCM',
          sampleRate: 16000,
        },
        callHeaders: [{
          key: 'X-Stream',
          value: '1',
        }],
      });

      expect(destination).toEqual({
        type: 'STREAM',
        stream: {
          endpoint: 'wss://example.com/audio',
          streamOptions: {
            codec: 'PCM',
            sampleRate: 16000,
          },
          callHeaders: [{
            key: 'X-Stream',
            value: '1',
          }],
        },
      });
    });

    it('should build a voice relay destination', () => {
      const destination = Destination.voiceRelay({
        endpoint: 'wss://example.com/relay',
        ttsVoice: Voice.v2.TtsVoiceName.Emma,
        sttLanguage: 'en-US',
        enableInterruptions: true,
        callHeaders: [{
          key: 'X-Relay',
          value: '1',
        }],
      });

      expect(destination).toEqual({
        type: 'VOICE_RELAY',
        voiceRelay: {
          endpoint: 'wss://example.com/relay',
          ttsVoice: 'Emma',
          sttLanguage: 'en-US',
          enableInterruptions: true,
          callHeaders: [{
            key: 'X-Relay',
            value: '1',
          }],
        },
      });
    });

    it('should accept a voice name outside the catalog', () => {
      const destination = Destination.voiceRelay({
        endpoint: 'wss://example.com/relay',
        ttsVoice: 'FutureVoice',
        sttLanguage: 'en-US',
      });

      expect(destination.voiceRelay.ttsVoice).toBe('FutureVoice');
    });
  });

  describe('of', () => {
    it('should default an untagged value to a phone destination', () => {
      const destination = Destination.of('76367472');

      expect(destination).toBeInstanceOf(Voice.v2.DestinationPhone);
      expect(destination).toEqual({
        type: 'PHONE',
        phone: {
          number: '76367472',
        },
      });
    });

    it('should strip a phone tag', () => {
      const destination = Destination.of('phone:+15550001111');

      expect(destination).toEqual({
        type: 'PHONE',
        phone: {
          number: '+15550001111',
        },
      });
    });

    it('should return a base SIP destination for sip and sips tags', () => {
      const sip = Destination.of('sip:user@example.com');
      const sips = Destination.of('sips:user@example.com');

      expect(sip).toBeInstanceOf(Voice.v2.GenericSipEndpoint);
      expect(sip).toBeInstanceOf(Voice.v2.SipEndpoint);
      expect(sip).not.toBeInstanceOf(Voice.v2.DestinationSip);
      expect(sip).not.toBeInstanceOf(Voice.v2.DestinationSipFrom);
      expect(sip).toEqual({
        type: 'SIP',
        sip: {
          endpoint: 'sip:user@example.com',
        },
      });
      expect(sips).toEqual({
        type: 'SIP',
        sip: {
          endpoint: 'sips:user@example.com',
        },
      });
    });

    it('should strip a stream tag and set only the endpoint', () => {
      const destination = Destination.of('stream:wss://example.com/audio');

      expect(destination).toBeInstanceOf(Voice.v2.DestinationStream);
      expect(destination).toEqual({
        type: 'STREAM',
        stream: {
          endpoint: 'wss://example.com/audio',
        },
      });
    });

    it('should keep an unspecified prefix as the phone number', () => {
      const destination = Destination.of('tel:+15550001111');

      expect(destination).toEqual({
        type: 'PHONE',
        phone: {
          number: 'tel:+15550001111',
        },
      });
    });

    it('should accept a tagged destination for from and for to', () => {
      const caller = '15550001111@sip.sinch.com';
      const recipient = '15550002222@sip.sinch.com';
      const commands = new Voice.v2.CommandsSequenceCreator()
        .dial((dial) => {
          dial
            .from(Destination.of(`sip:${caller}`))
            .to(Destination.of(`sip:${recipient}`));
        })
        .build();

      expect(commands).toEqual([{
        command: 'dial',
        from: {
          type: 'SIP',
          sip: {
            endpoint: `sip:${caller}`,
          },
        },
        to: {
          type: 'SIP',
          sip: {
            endpoint: `sip:${recipient}`,
          },
        },
      }]);
    });
  });
});
