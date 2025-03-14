/**
 * NONE - Omit metadata.
 * FULL - Include all metadata assigned to the conversation.
 */
export type ConversationMetadataReportView = 'NONE' | 'FULL';

/**
 * Update strategy for the `conversation_metadata` field. Only supported in `CONVERSATION` processing mode.
 */
export type ConversationMetadataUpdateStrategy = 'REPLACE' | 'MERGE_PATCH';

/**
 * You can set the desired size of the card in the message.
 */
export type CardHeight = 'UNSPECIFIED_HEIGHT' | 'SHORT' | 'MEDIUM' | 'TALL';

export type ConversationDirection = 'UNDEFINED_DIRECTION' | 'TO_APP' | 'TO_CONTACT';

export type ConversationMergeStrategy = 'MERGE';

export type ConversationMessagesView = 'WITH_METADATA' | 'WITHOUT_METADATA';

export type DeliveryStatus =
  'QUEUED_ON_CHANNEL'
  | 'DELIVERED'
  | 'READ'
  | 'FAILED'
  | 'SWITCHING_CHANNEL';

export type DispatchRetentionPolicyType = 'MESSAGE_EXPIRE_POLICY';

/**
 * The channel. Must be one of the supported channels for this operation.
 */
export type GetChannelProfileConversationChannel = 'MESSENGER' | 'INSTAGRAM' | 'VIBER' | 'LINE';

/**
 * Select the priority type for the message
 */
export type MessageQueue = 'NORMAL_PRIORITY' | 'HIGH_PRIORITY';

/**
 * Whether or not Conversation API should store contacts and conversations for the app. For more information, see [Processing Modes](https://developers.sinch.com/docs/conversation/processing-modes/).
 */
export type ProcessingMode = 'CONVERSATION' | 'DISPATCH';

/**
 * Overrides the app's [Processing Mode](https://developers.sinch.com/docs/conversation/processing-modes/). Default value is `DEFAULT`.
 */
export type ProcessingStrategy = 'DEFAULT' | 'DISPATCH_ONLY';

export type WebhookTargetType = 'DISMISS' | 'HTTP';

export type MessageSource = 'CONVERSATION_SOURCE' | 'DISPATCH_SOURCE';
