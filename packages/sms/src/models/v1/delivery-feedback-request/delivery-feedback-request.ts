/**
 * Model: DeliveryFeedbackRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


export interface DeliveryFeedbackRequest {

  /** A list of phone numbers (MSISDNs) that have successfully received the message. The key is required, however, the value can be an empty array (`[]`) for *a batch*. If the feedback was enabled for *a group*, at least one phone number is required. */
  recipients: string[];
}


