import { CallHeadersInner } from '../call-headers-inner';
import { SipCallHeadersInner } from '../sip-call-headers-inner';
import { SipDetails, TransportEnum } from '../sip-details/sip-details';
import { SipFromDetails } from '../sip-from-details';
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

export interface SipDestinationParameters extends GenericSipEndpoint {
  /** Maps to `sip.transport`. */
  transport?: TransportEnum;
  /** Maps to `sip.callHeaders`. */
  callHeaders?: SipCallHeadersInner[];
}

export interface SipFromDestinationParameters extends GenericSipEndpoint {
  /** Maps to `sip.displayName`. */
  displayName?: string;
}

export interface VoiceRelayDestinationParameters {
  endpoint: string;
  ttsVoice: string;
  sttLanguage: string;
  callHeaders?: CallHeadersInner[];
  enableInterruptions?: boolean;
}

/** Phone destination. `number` is the E.164 value, without a `phone:` prefix. */
export class DestinationPhone {
  readonly type = 'PHONE' as const;
  readonly phone: { number: string };

  constructor(number: string) {
    this.phone = { number };
  }
}

/** SIP destination for `to`, including optional transport and headers. */
export class DestinationSip extends GenericSipEndpoint {
  readonly sip: SipDetails;

  constructor(parameters: SipDestinationParameters, scheme: 'sip:' | 'sips:') {
    const endpoint = withSipScheme(parameters.sip.endpoint, scheme);
    super(endpoint);
    const sip: SipDetails = { endpoint };
    if (parameters.transport !== undefined) {
      sip.transport = parameters.transport;
    }
    if (parameters.callHeaders !== undefined) {
      sip.callHeaders = parameters.callHeaders;
    }
    this.sip = sip;
  }
}

/** SIP destination for `from`, including an optional display name. */
export class DestinationSipFrom extends GenericSipEndpoint {
  readonly sip: SipFromDetails;

  constructor(parameters: SipFromDestinationParameters, scheme: 'sip:' | 'sips:') {
    const endpoint = withSipScheme(parameters.sip.endpoint, scheme);
    super(endpoint);
    const sip: SipFromDetails = { endpoint };
    if (parameters.displayName !== undefined) {
      sip.displayName = parameters.displayName;
    }
    this.sip = sip;
  }
}

/** Stream destination. Only `endpoint` is set. */
export class DestinationStream {
  readonly type = 'STREAM' as const;
  readonly stream: { endpoint: string };

  constructor(endpoint: string) {
    this.stream = { endpoint };
  }
}

export class DestinationVoiceRelay {
  readonly type = 'VOICE_RELAY' as const;
  readonly voiceRelay: VoiceRelayDetails;

  constructor(parameters: VoiceRelayDestinationParameters) {
    const voiceRelay: VoiceRelayDetails = {
      endpoint: parameters.endpoint,
      ttsVoice: parameters.ttsVoice,
      sttLanguage: parameters.sttLanguage,
    };
    if (parameters.callHeaders !== undefined) {
      voiceRelay.callHeaders = parameters.callHeaders;
    }
    if (parameters.enableInterruptions !== undefined) {
      voiceRelay.enableInterruptions = parameters.enableInterruptions;
    }
    this.voiceRelay = voiceRelay;
  }
}

function withSipScheme(endpoint: string, scheme: 'sip:' | 'sips:'): string {
  if (endpoint.startsWith('sip:') || endpoint.startsWith('sips:')) {
    return endpoint;
  }
  return `${scheme}${endpoint}`;
}

function phoneNumber(destination: string): string {
  if (destination.startsWith('phone:')) {
    return destination.slice('phone:'.length);
  }
  return destination;
}

/**
 * Destination factories for Voice v2 call `to` and `from` values.
 *
 * `of('sip:')` and `of('sips:')` return a {@link SipEndpoint} with `type` and `endpoint` only.
 * `sip` and `sipFrom` return subclasses that can also set the optional fields.
 */
export const Destination = {
  phone(number: string): DestinationPhone {
    return new DestinationPhone(number);
  },

  sip(parameters: SipDestinationParameters): DestinationSip {
    return new DestinationSip(parameters, 'sip:');
  },

  sips(parameters: SipDestinationParameters): DestinationSip {
    return new DestinationSip(parameters, 'sips:');
  },

  sipFrom(parameters: SipFromDestinationParameters): DestinationSipFrom {
    return new DestinationSipFrom(parameters, 'sip:');
  },

  sipsFrom(parameters: SipFromDestinationParameters): DestinationSipFrom {
    return new DestinationSipFrom(parameters, 'sips:');
  },

  /** Sets `stream.endpoint` only. Voice and language belong on {@link Destination.voiceRelay}. */
  stream(endpoint: string): DestinationStream {
    return new DestinationStream(endpoint);
  },

  voiceRelay(parameters: VoiceRelayDestinationParameters): DestinationVoiceRelay {
    return new DestinationVoiceRelay(parameters);
  },

  /**
   * Builds a destination from a tagged value.
   * `+…` and any value without a tag become a phone destination.
   * `phone:` is stripped. `sip:` and `sips:` are kept on the endpoint.
   * `stream:` is stripped. There is no `sipFrom:` tag; from and to share {@link SipEndpoint}.
   */
  of(destination: string): DestinationPhone | SipEndpoint | DestinationStream {
    if (destination.startsWith('phone:')) {
      return new DestinationPhone(phoneNumber(destination));
    }
    if (destination.startsWith('sips:') || destination.startsWith('sip:')) {
      return new GenericSipEndpoint(destination);
    }
    if (destination.startsWith('stream:')) {
      return new DestinationStream(destination.slice('stream:'.length));
    }
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(destination)) {
      throw new Error(`destination "${destination}" is not recognized`);
    }
    return new DestinationPhone(destination);
  },
};
