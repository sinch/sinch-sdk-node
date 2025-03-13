/**
 * This object contains additional settings related to callback processing.
 */
export interface CallbackSettings {

  /** Optional. Secret can be used to sign contents of delivery receipts for a message that was sent with the default callback URL overridden (using the [`callback_url` field](https://developers.sinch.com/docs/conversation/api-reference/conversation/tag/Messages/#tag/Messages/operation/Messages_SendMessage!path=callback_url&t=request)). You can then use the secret to verify the signature. */
  secret_for_overridden_callback_urls?: string;
}
