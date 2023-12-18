/**
 * Model: RentAnyNumberRequestSmsConfiguration
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

export interface RentAnyNumberRequestSmsConfiguration {
  /** The SMS service that the number will be linked to. The `servicePlanId` can be found in the [Sinch Customer Dashboard](https://dashboard.sinch.com/sms/api/rest). */
  servicePlanId: string;
  /** The 10DLC campaign ID that the number will be linked to. */
  campaignId?: string;
}
