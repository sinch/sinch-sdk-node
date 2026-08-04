/**
 * Shared fields for Numbers callback events (ACTIVE_NUMBER and NUMBER_ORDER).
 */
export interface CallbackPayloadCommon {
  /** The ID of the event. */
  eventId?: string;
  /** The date and time when the callback was created and added to the callbacks queue. */
  timestamp?: Date;
  /** The ID of the project to which the event belongs. */
  projectId?: string;
  /** The type of the resource. */
  resourceType?: ResourceTypeEnum;
  /**
   * The status of the event.
   * @deprecated Prefer `CallbackPayloadActiveNumber.status` or `CallbackPayloadNumberOrder.status` after narrowing on `resourceType`.
   */
  status?: string;
  /**
   * If the status is FAILED, a failure code will be provided. For numbers provisioning to SMS platform, there won't be any extra `failureCode`, as the result is binary. For campaign provisioning-related failures, refer to the list for the possible values.
   * @deprecated Prefer `CallbackPayloadActiveNumber.failureCode` after narrowing on `resourceType`.
   */
  failureCode?: FailureCodeEnum;
  /**
   * If the status is FAILED, certain processes (eg. number to campaign provisioning) will have an internalFailureCode in the payload. The details of these codes can be found in our dedicated [Provisioning errors](https://developers.sinch.com/docs/numbers/api-reference/error-codes/provisioning-errors) documentation.
   * @deprecated Prefer `CallbackPayloadActiveNumber.internalFailureCode` after narrowing on `resourceType`.
   */
  internalFailureCode?: string;
}

type CallbackPayloadDeprecatedFields = 'status' | 'failureCode' | 'internalFailureCode';

/**
 * Keeps `failureCode` / `internalFailureCode` accessible on the `CallbackPayload` union for backwards
 * compatibility. Access via the union is `@deprecated`; prefer narrowing to `CallbackPayloadActiveNumber`.
 */
type CallbackPayloadDeprecatedCompat = Pick<CallbackPayloadCommon, 'failureCode' | 'internalFailureCode'>;

/**
 * Callback for an active number provisioning / deprovisioning event.
 */
export interface CallbackPayloadActiveNumber
  extends Omit<CallbackPayloadCommon, CallbackPayloadDeprecatedFields> {
  /** The type of the resource. */
  resourceType?: 'ACTIVE_NUMBER' | string;
  /** The unique identifier of the resource, depending on the resource type. For example, a phone number. */
  resourceId?: string;
  /** The type of the event. */
  eventType?: EventTypeEnum;
  /** The status of the event or the state transition it represents. */
  status?: CallbackPayloadActiveNumberStatusEnum;
  /** If the status is FAILED, a failure code will be provided. For numbers provisioning to SMS platform, there won't be any extra `failureCode`, as the result is binary. For campaign provisioning-related failures, refer to the list for the possible values. */
  failureCode?: FailureCodeEnum;
  /** If the status is FAILED, certain processes (eg. number to campaign provisioning) will have an internalFailureCode in the payload. The details of these codes can be found in our dedicated [Provisioning errors](https://developers.sinch.com/docs/numbers/api-reference/error-codes/provisioning-errors) documentation. */
  internalFailureCode?: string;
}

/**
 * Callback for a number order state transition event.
 */
export interface CallbackPayloadNumberOrder
  extends Omit<CallbackPayloadCommon, CallbackPayloadDeprecatedFields> {
  /** The type of the resource. */
  resourceType?: 'NUMBER_ORDER' | string;
  /** The unique identifier of the resource, depending on the resource type. For example, a number order ID. */
  resourceId?: string;
  /** The type of the event. */
  eventType?: CallbackPayloadNumberOrderEventTypeEnum;
  /** The status of the event or the state transition it represents. */
  status?: CallbackPayloadNumberOrderStatusEnum;
}

/**
 * A notification of an event sent to your configured callback URL.
 * Discriminated by `resourceType`: `ACTIVE_NUMBER` or `NUMBER_ORDER`.
 *
 * `failureCode` and `internalFailureCode` remain readable on this union for backwards compatibility,
 * but are `@deprecated` here — narrow to `CallbackPayloadActiveNumber` instead.
 */
export type CallbackPayload =
  (CallbackPayloadActiveNumber | CallbackPayloadNumberOrder) & CallbackPayloadDeprecatedCompat;

/** The type of the resource. */
export type ResourceTypeEnum = 'ACTIVE_NUMBER' | 'NUMBER_ORDER' | string;

/** Event types for ACTIVE_NUMBER callbacks. */
export type EventTypeEnum = 'PROVISIONING_TO_SMS_PLATFORM'
  | 'DEPROVISIONING_FROM_SMS_PLATFORM'
  | 'PROVISIONING_TO_CAMPAIGN'
  | 'DEPROVISIONING_FROM_CAMPAIGN'
  | 'PROVISIONING_TO_VOICE_PLATFORM'
  | 'DEPROVISIONING_FROM_VOICE_PLATFORM'
  | string;

/** Event types for NUMBER_ORDER callbacks. */
export type CallbackPayloadNumberOrderEventTypeEnum = 'NUMBER_ORDER_PROCESSING' | string;

/** Status values for ACTIVE_NUMBER callbacks. */
export type CallbackPayloadActiveNumberStatusEnum = 'SUCCEEDED' | 'FAILED' | string;

/** Status values for NUMBER_ORDER callbacks. */
export type CallbackPayloadNumberOrderStatusEnum = 'IN_REVIEW'
  | 'BLOCKED'
  | 'COMPLETED'
  | 'REJECTED'
  | 'EXPIRED'
  | string;

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
