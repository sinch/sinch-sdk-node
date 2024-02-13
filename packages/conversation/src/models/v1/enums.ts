export type {
  PaymentStatusEnum as PaymentStatusUpdateEventPaymentStatusEnum,
  PaymentTransactionStatusEnum as PaymentStatusUpdateEventPaymentTransactionStatusEnum,
} from './event-inbound/event-inbound';
export type {
  SentimentResult as MachineLearningSentimentEnum,
  EvaluationEnum as OffensiveAnalysisEvaluationEnum,
} from './smart-conversations-event/smart-conversations-event';

export type ConversationMetadataReportView = 'NONE' | 'FULL';

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

export type ProcessingMode = 'CONVERSATION' | 'DISPATCH';

export type ProcessingStrategy = 'DEFAULT' | 'DISPATCH_ONLY';

export type WebhookTargetType = 'DISMISS' | 'HTTP';
