/**
 * Model: CallbackPayload
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


export interface CallbackPayload {

  /** The ID of the event. */
  eventId?: string;
  /** The date and time when the callback was created and added to the callbacks queue. */
  timestamp?: Date;
  /** The ID of the project to which the event belongs. */
  projectId?: string;
  /** The unique identifier of the resource, depending on the resource type. For example, a phone number, a hosting order ID, or a brand ID. */
  resourceId?: string;
  /** The type of the resource. */
  resourceType?: string;
  /** The type of the event. */
  eventType?: EventTypeEnum;
  /** The status of the event. For example, `SUCCEEDED` or `FAILED`. */
  status?: string;
  /** If the status is FAILED, a failure code will be provided. For numbers provisioning to SMS platform, there won\'t be any extra `failureCode`, as the result is binary. For campaign provisioning-related failures, refer to the list for the possible values. */
  failureCode?: FailureCodeEnum;
}

export type EventTypeEnum = 'PROVISIONING_TO_SMS_PLATFORM'
  | 'DEPROVISIONING_FROM_SMS_PLATFORM'
  | 'PROVISIONING_TO_CAMPAIGN'
  | 'DEPROVISIONING_FROM_CAMPAIGN'
  | 'PROVISIONING_TO_VOICE_PLATFORM'
  | 'DEPROVISIONING_TO_VOICE_PLATFORM'

export type FailureCodeEnum = 'CAMPAIGN_NOT_AVAILABLE'
  | 'EXCEEDED_10DLC_LIMIT'
  | 'NUMBER_PROVISIONING_FAILED'
  | 'PARTNER_SERVICE_UNAVAILABLE'
  | 'CAMPAIGN_PENDING_ACCEPTANCE'
  | 'MNO_SHARING_ERROR'
  | 'CAMPAIGN_PROVISIONING_FAILED'
  | 'CAMPAIGN_EXPIRED'
  | 'CAMPAIGN_MNO_REJECTED'
  | 'CAMPAIGN_MNO_SUSPENDED'
  | 'CAMPAIGN_MNO_REVIEW'
  | 'INSUFFICIENT_BALANCE'
  | 'MOCK_CAMPAIGN_NOT_ALLOWED'
  | 'TFN_NOT_ALLOWED'
  | 'INVALID_NNID';

