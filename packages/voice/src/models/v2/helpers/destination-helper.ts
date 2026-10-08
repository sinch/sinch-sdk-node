import { Phone } from '../phone';
import { PhoneDetails } from '../phone-details';
import { Sip } from '../sip';
import { SipDetails } from '../sip-details';
import { SipFrom } from '../sip-from';
import { SipFromDetails } from '../sip-from-details';
import { Stream } from '../stream';
import { StreamDetails } from '../stream-details';
import { VoiceRelay } from '../voice-relay';
import { VoiceRelayDetails } from '../voice-relay-details';

/**
 * Shared SIP destination. `of('sip:')` and `of('sips:')` return this shape:
 * `type` and `endpoint` only. `sip` and `sipFrom` extend it with optional fields.
 */
export abstract class SipEndpoint {
  readonly type = 'SIP' as const;
  abstract readonly sip: { endpoint: string };
}

/** SIP destination with `type` and `endpoint` only. */
export class GenericSipEndpoint extends SipEndpoint {
  readonly sip: { endpoint: string };

  constructor(endpoint: string) {
    super();
    this.sip = { endpoint };
  }
}

/** Phone destination. `number` is the E.164 value, without a `phone:` prefix. */
export class DestinationPhone implements Phone {
  readonly type = 'PHONE' as const;
  readonly phone: PhoneDetails;

  constructor(number: string) {
    this.phone = { number };
  }
}

/** SIP destination. Transport and headers are copied when present. */
export class DestinationSip extends GenericSipEndpoint implements Sip {
  readonly sip: SipDetails;

  constructor(sip: SipDetails) {
    super(sip.endpoint);
    this.sip = sip;
  }
}

/** SIP origin. Display name is copied when present. */
export class DestinationSipFrom extends GenericSipEndpoint implements SipFrom {
  readonly sip: SipFromDetails;

  constructor(sip: SipFromDetails) {
    super(sip.endpoint);
    this.sip = sip;
  }
}

/** Stream destination. Options and headers are copied when present. */
export class DestinationStream implements Stream {
  readonly type = 'STREAM' as const;
  readonly stream: StreamDetails;

  constructor(stream: StreamDetails) {
    this.stream = stream;
  }
}

/**
 * Value produced by {@link Destination.of}: a phone, a SIP endpoint with `type` and
 * `endpoint` only, or a stream. Phone and SIP can be used as a dial `from` or `to`.
 */
export type BaseDestination = DestinationPhone | SipEndpoint | DestinationStream;

/** Voice relay destination. */
export class DestinationVoiceRelay implements VoiceRelay {
  readonly type = 'VOICE_RELAY' as const;
  readonly voiceRelay: VoiceRelayDetails;

  constructor(voiceRelay: VoiceRelayDetails) {
    this.voiceRelay = voiceRelay;
  }
}

/**
 * Destination factories for Voice v2 call `to` and `from` values.
 *
 * `of('sip:')` and `of('sips:')` return a {@link SipEndpoint} with `type` and `endpoint` only.
 * Endpoint strings are copied as given. `sip` takes a {@link SipDetails}.
 * `sipFrom` takes a {@link SipFromDetails}.
 */
export const Destination = {
  phone(number: string): DestinationPhone {
    return new DestinationPhone(number);
  },

  sip(sip: SipDetails): DestinationSip {
    return new DestinationSip(sip);
  },

  sipFrom(sip: SipFromDetails): DestinationSipFrom {
    return new DestinationSipFrom(sip);
  },

  /**
   * Sets `stream.endpoint`. Pass a string, or a {@link StreamDetails}.
   * Voice and language belong on {@link Destination.voiceRelay}.
   */
  stream(endpointOrDetails: string | StreamDetails): DestinationStream {
    if (typeof endpointOrDetails === 'string') {
      return new DestinationStream({ endpoint: endpointOrDetails });
    }
    return new DestinationStream(endpointOrDetails);
  },

  voiceRelay(voiceRelay: VoiceRelayDetails): DestinationVoiceRelay {
    return new DestinationVoiceRelay(voiceRelay);
  },

  /**
   * Builds a phone, SIP, or stream destination from a string.
   * `sip:` and `sips:` stay on the endpoint and can be used for `from` or `to`.
   * `stream:` is removed. `phone:` is removed.
   * Any other value, including a bare number such as `76367472`, is a phone destination and is kept as is.
   * Voice relay is not built here; it requires `ttsVoice` and `sttLanguage`.
   */
  of(destination: string): BaseDestination {
    if (destination.startsWith('sips:') || destination.startsWith('sip:')) {
      return new GenericSipEndpoint(destination);
    }
    if (destination.startsWith('stream:')) {
      return new DestinationStream({ endpoint: destination.slice('stream:'.length) });
    }
    if (destination.startsWith('phone:')) {
      destination = destination.slice('phone:'.length);
    }
    return new DestinationPhone(destination);
  },
};
