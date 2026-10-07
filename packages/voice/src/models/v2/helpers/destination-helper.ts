import { CallHeadersInner } from '../call-headers-inner';
import { SipCallHeadersInner } from '../sip-call-headers-inner';
import { SipDetails, TransportEnum } from '../sip-details/sip-details';
import { SipFromDetails } from '../sip-from-details';
import { StreamDetails } from '../stream-details';
import { StreamOptions } from '../stream-options';
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

/** Maps to {@link SipDetails}. `endpoint` is copied as given. */
export interface SipDestinationParameters {
  /** Maps to `sip.endpoint`. */
  endpoint: string;
  /** Maps to `sip.transport`. */
  transport?: TransportEnum;
  /** Maps to `sip.callHeaders`. */
  callHeaders?: SipCallHeadersInner[];
}

/** Maps to {@link SipFromDetails}. `endpoint` is copied as given. */
export interface SipFromDestinationParameters {
  /** Maps to `sip.endpoint`. */
  endpoint: string;
  /** Maps to `sip.displayName`. */
  displayName?: string;
}

/** Maps to {@link StreamDetails}. */
export interface StreamDestinationParameters {
  /** Maps to `stream.endpoint`. */
  endpoint: string;
  /** Maps to `stream.streamOptions`. */
  streamOptions?: StreamOptions;
  /** Maps to `stream.callHeaders`. */
  callHeaders?: CallHeadersInner[];
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

/** SIP destination. Transport and headers are copied when present. */
export class DestinationSip extends GenericSipEndpoint {
  readonly sip: SipDetails;

  constructor(parameters: SipDestinationParameters) {
    super(parameters.endpoint);
    this.sip = sipFields(parameters);
  }
}

/** SIP origin. Display name is copied when present. */
export class DestinationSipFrom extends GenericSipEndpoint {
  readonly sip: SipFromDetails;

  constructor(parameters: SipFromDestinationParameters) {
    super(parameters.endpoint);
    const sip: SipFromDetails = { endpoint: parameters.endpoint };
    if (parameters.displayName !== undefined) {
      sip.displayName = parameters.displayName;
    }
    this.sip = sip;
  }
}

/** Stream destination. Options and headers are copied when present. */
export class DestinationStream {
  readonly type = 'STREAM' as const;
  readonly stream: StreamDetails;

  constructor(parameters: StreamDestinationParameters) {
    const stream: StreamDetails = { endpoint: parameters.endpoint };
    if (parameters.streamOptions !== undefined) {
      stream.streamOptions = parameters.streamOptions;
    }
    if (parameters.callHeaders !== undefined) {
      stream.callHeaders = parameters.callHeaders;
    }
    this.stream = stream;
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

function sipFields(parameters: SipDestinationParameters): SipDetails {
  const sip: SipDetails = { endpoint: parameters.endpoint };
  if (parameters.transport !== undefined) {
    sip.transport = parameters.transport;
  }
  if (parameters.callHeaders !== undefined) {
    sip.callHeaders = parameters.callHeaders;
  }
  return sip;
}

/**
 * Destination factories for Voice v2 call `to` and `from` values.
 *
 * `of('sip:')` and `of('sips:')` return a {@link SipEndpoint} with `type` and `endpoint` only.
 * Endpoint strings are copied as given. `sip` can also set transport and headers.
 * `sipFrom` can also set a display name.
 */
export const Destination = {
  phone(number: string): DestinationPhone {
    return new DestinationPhone(number);
  },

  sip(parameters: SipDestinationParameters): DestinationSip {
    return new DestinationSip(parameters);
  },

  sipFrom(parameters: SipFromDestinationParameters): DestinationSipFrom {
    return new DestinationSipFrom(parameters);
  },

  /**
   * Sets `stream.endpoint`. Pass a string, or an object with `streamOptions` and `callHeaders`.
   * Voice and language belong on {@link Destination.voiceRelay}.
   */
  stream(endpointOrParameters: string | StreamDestinationParameters): DestinationStream {
    if (typeof endpointOrParameters === 'string') {
      return new DestinationStream({ endpoint: endpointOrParameters });
    }
    return new DestinationStream(endpointOrParameters);
  },

  voiceRelay(parameters: VoiceRelayDestinationParameters): DestinationVoiceRelay {
    return new DestinationVoiceRelay(parameters);
  },

  /**
   * Builds a phone, SIP, or stream destination from a string.
   * `sip:` and `sips:` stay on the endpoint and can be used for `from` or `to`.
   * `stream:` is removed. `phone:` is removed.
   * Any other value, including a bare number such as `76367472`, is a phone destination and is kept as is.
   * Voice relay is not built here; it requires `ttsVoice` and `sttLanguage`.
   */
  of(destination: string): DestinationPhone | SipEndpoint | DestinationStream {
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
