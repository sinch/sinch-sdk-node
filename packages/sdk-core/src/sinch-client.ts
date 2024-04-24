import { ConversationService } from '@sinch/conversation';
import { FaxService } from '@sinch/fax';
import { NumbersService } from '@sinch/numbers';
import { SmsService } from '@sinch/sms';
import { VerificationService } from '@sinch/verification';
import { VoiceService } from '@sinch/voice';
import { SinchClientParameters } from '@sinch/sdk-client';

/** Sinch Client to declare and initialize the supported APIs */
export class SinchClient {

  public readonly conversation: ConversationService;
  public readonly fax: FaxService;
  public readonly numbers: NumbersService;
  public readonly sms: SmsService;
  public readonly verification: VerificationService;
  public readonly voice: VoiceService;

  /**
   * Initialize your API Client instance with the provided credentials.
   *
   * @param {SinchClientParameters} params - The object containing the Sinch credentials.
   */
  constructor(params: SinchClientParameters) {
    this.conversation = new ConversationService(params);
    this.fax = new FaxService(params);
    this.numbers = new NumbersService(params);
    this.sms = new SmsService(params);
    this.verification = new VerificationService(params);
    this.voice = new VoiceService(params);
  }
}
