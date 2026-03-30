import { DirectionEnum } from '../enum';

export interface CallBlockingRuleRequest {
  /** The name for the call blocking rule. */
  name?: string;
  /** The direction of the call blocking rule. Can be either INBOUND or OUTBOUND. */
  direction: DirectionEnum;
  /** The country code of the inbound call. */
  callerCountry?: string;
  /** The country code of the outbound call. */
  calleeCountry?: string;
  /** Use this field to match the prefixes of an inbound call\'s phone number. */
  callerMatch?: string;
  /** Use this field to match the prefixes of an outbound call\'s phone number. */
  calleeMatch?: string;
}

export interface CallBlockingRule {
  /** The name for the call blocking rule. */
  name?: string;
  /** The direction of the call blocking rule. Can be either INBOUND or OUTBOUND. */
  direction: DirectionEnum;
  /** The country code of the inbound call. */
  callerCountry?: string;
  /** The country code of the outbound call. */
  calleeCountry?: string;
  /** Use this field to match the prefixes of an inbound call\'s phone number. */
  callerMatch?: string;
  /** Use this field to match the prefixes of an outbound call\'s phone number. */
  calleeMatch?: string;
  /** The ID of the call blocking rule. */
  id: string;
  /** The date and time that the call blocking rule was created. */
  createTime?: Date;
  /** The date and time that the call blocking rule was last modified. */
  updateTime?: Date | null;
  /** The ID of the account. */
  projectId?: string;
}
