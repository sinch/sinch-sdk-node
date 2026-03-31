/**
 * NONE - Omit metadata.
 * FULL - Include all metadata assigned to the conversation.
 */
export type ConversationMetadataReportView = 'NONE' | 'FULL' | string;

/**
 * Update strategy for the `conversation_metadata` field. Only supported in `CONVERSATION` processing mode.
 */
export type ConversationMetadataUpdateStrategy = 'REPLACE' | 'MERGE_PATCH' | string;

/**
 * You can set the desired size of the card in the message.
 */
export type CardHeight = 'UNSPECIFIED_HEIGHT' | 'SHORT' | 'MEDIUM' | 'TALL' | string;

/**
 * The direction of the message flow, indicating whether the message was sent to or from the Conversation API app.
 */
export type ConversationDirection = 'TO_APP' | 'TO_CONTACT' | string;

export type ConversationMergeStrategy = 'MERGE' | string;

export type ConversationMessagesView = 'WITH_METADATA' | 'WITHOUT_METADATA' | string;

export type DeliveryStatus =
  'QUEUED_ON_CHANNEL'
  | 'DELIVERED'
  | 'READ'
  | 'FAILED'
  | 'SWITCHING_CHANNEL'
  | string;

export type DispatchRetentionPolicyType = 'MESSAGE_EXPIRE_POLICY' | string;

/**
 * The channel. Must be one of the supported channels for this operation.
 */
export type GetChannelProfileConversationChannel = 'MESSENGER' | 'INSTAGRAM' | 'VIBER' | 'LINE' | string;

/**
 * Select the priority type for the message
 */
export type MessageQueue = 'NORMAL_PRIORITY' | 'HIGH_PRIORITY' | string;

/**
 * Whether or not Conversation API should store contacts and conversations for the app. For more information, see [Processing Modes](https://developers.sinch.com/docs/conversation/processing-modes/).
 */
export type ProcessingMode = 'CONVERSATION' | 'DISPATCH' | string;

/**
 * Overrides the app's [Processing Mode](https://developers.sinch.com/docs/conversation/processing-modes/). Default value is `DEFAULT`.
 */
export type ProcessingStrategy = 'DEFAULT' | 'DISPATCH_ONLY' | string;

export type WebhookTargetType = 'DISMISS' | 'HTTP' | string;

export type MessageSource = 'CONVERSATION_SOURCE' | 'DISPATCH_SOURCE' | string;

export type ConsentsListType = 'OPT_OUT_ALL' | 'OPT_OUT_MARKETING' | 'OPT_OUT_NOTIFICATION' | string;

export type ConsentOrigin = 'ORIGIN_API' | 'ORIGIN_MO' | string;

export type ConsentOperation = 'OPERATION_INSERT' | 'OPERATION_UPDATE' | 'OPERATION_DELETE' | string;
