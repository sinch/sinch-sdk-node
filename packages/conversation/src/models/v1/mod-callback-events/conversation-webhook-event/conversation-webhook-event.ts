import { MessageInboundEvent } from '../message-inbound-event';
import { MessageInboundSmartConversationRedactionEvent } from '../message-inbound-smart-conversation-redaction-event';
import { MessageSubmitEvent } from '../message-submit-event';
import { MessageDeliveryReceiptEvent } from '../message-delivery-receipt-event';
import { EventInbound } from '../event-inbound';
import { EventDelivery } from '../event-delivery';
import { ConversationStartEvent } from '../conversation-start-event';
import { ConversationStopEvent } from '../conversation-stop-event';
import { ConversationDeleteEvent } from '../conversation-delete-event';
import { ContactCreateEvent } from '../contact-create-event';
import { ContactDeleteEvent } from '../contact-delete-event';
import { ContactMergeEvent } from '../contact-merge-event';
import { ContactUpdateEvent } from '../contact-update-event';
import { ContactIdentitiesDuplicationEvent } from '../contact-identities-duplication-event';
import { CapabilityEvent } from '../capability-event';
import { OptInEvent } from '../opt-in-event';
import { OptOutEvent } from '../opt-out-event';
import { ChannelEvent } from '../channel-event';
import { UnsupportedCallbackEvent } from '../unsupported-callback-event';
import { SmartConversationsEvent } from '../smart-conversations-event';
import { RecordNotificationEvent } from '../record-notification';

export type ConversationWebhookEvent =
  MessageInboundEvent
  | MessageInboundSmartConversationRedactionEvent
  | MessageSubmitEvent
  | MessageDeliveryReceiptEvent
  | EventInbound
  | EventDelivery
  | ConversationStartEvent
  | ConversationStopEvent
  | ConversationDeleteEvent
  | ContactCreateEvent
  | ContactDeleteEvent
  | ContactMergeEvent
  | ContactUpdateEvent
  | ContactIdentitiesDuplicationEvent
  | CapabilityEvent
  | OptInEvent
  | OptOutEvent
  | ChannelEvent
  | SmartConversationsEvent
  | RecordNotificationEvent
  | UnsupportedCallbackEvent;
