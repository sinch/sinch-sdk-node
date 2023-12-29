import { Numbers } from '@sinch/numbers';
import { Sms } from '@sinch/sms';
import { Verification } from '@sinch/verification';
import { SinchClientParameters } from '@sinch/sdk-client';
import { Voice } from '@sinch/voice';

/** Sinch Client to declare and initialize the supported APIs */
export class SinchClient {

  public readonly numbers: Numbers;
  public readonly sms: Sms;
  public readonly verification: Verification;
  public readonly voice: Voice;

  /**
   * Initialize your API Client instance with the provided credentials.
   *
   * @param {SinchClientParameters} params - The object containing the Sinch credentials.
   */
  constructor(params: SinchClientParameters) {
    // Initialize the "Numbers" API
    this.numbers = new Numbers(params);

    // Initialize the "SMS" API.
    this.sms = new Sms(params);

    // Initialize the "Verification" API
    this.verification = new Verification(params);

    // Initialize the "Voice" API
    this.voice = new Voice(params);
  }
}
