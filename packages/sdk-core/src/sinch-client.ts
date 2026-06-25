import { ConversationService } from '@sinch/conversation';
import { FaxService } from '@sinch/fax';
import { NumbersService } from '@sinch/numbers';
import { SmsService } from '@sinch/sms';
import { VerificationService } from '@sinch/verification';
import { VoiceService } from '@sinch/voice';
import { SinchClientParameters, resolveClientParameters } from '@sinch/sdk-client';
import { ElasticSipTrunkingService } from '@sinch/elastic-sip-trunking';
import { NumberLookupService } from '@sinch/number-lookup';

/** Sinch Client to declare and initialize the supported APIs */
export class SinchClient {

  /** Conversation API service (OAuth2: `projectId`, `keyId`, `keySecret`). */
  public readonly conversation: ConversationService;
  /** Fax API service (OAuth2: `projectId`, `keyId`, `keySecret`). */
  public readonly fax: FaxService;
  /** Elastic SIP Trunking API service (OAuth2: `projectId`, `keyId`, `keySecret`). */
  public readonly elasticSipTrunking: ElasticSipTrunkingService;
  /** Numbers API service (OAuth2: `projectId`, `keyId`, `keySecret`). */
  public readonly numbers: NumbersService;
  /** SMS API service (OAuth2 or API token; see {@link SmsService}). */
  public readonly sms: SmsService;
  /** Verification API service (signed app: `applicationId`, `applicationSecret`). */
  public readonly verification: VerificationService;
  /** Voice API service (signed app: `applicationId`, `applicationSecret`). */
  public readonly voice: VoiceService;
  /** Number Lookup API service (OAuth2: `projectId`, `keyId`, `keySecret`). */
  public readonly numberLookup: NumberLookupService;

  /**
   * Initialize your API Client instance with the provided credentials.
   *
   * @param {SinchClientParameters} params - The object containing the Sinch credentials.
   */
  constructor(clientParams: SinchClientParameters) {
    const params = resolveClientParameters(clientParams);
    this.conversation = new ConversationService(params);
    this.elasticSipTrunking = new ElasticSipTrunkingService(params);
    this.fax = new FaxService(params);
    this.numbers = new NumbersService(params);
    this.sms = new SmsService(params);
    this.verification = new VerificationService(params);
    this.voice = new VoiceService(params);
    this.numberLookup = new NumberLookupService(params);
  }
}
