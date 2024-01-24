/**
 * - `UNSPECIFIED_TRIGGER`: Using this value will cause errors.
 * - `MESSAGE_DELIVERY`: Subscribe to delivery receipts for a message sent.
 * - `EVENT_DELIVERY`: Subscribe to delivery receipts for a event sent.
 * - `MESSAGE_INBOUND`: Subscribe to inbound messages from end users on the underlying channels.
 * - `EVENT_INBOUND`: Subscribe to inbound events from end users on the underlying channels.
 * - `CONVERSATION_START`: Subscribe to an event that is triggered when a new conversation has been started.
 * - `CONVERSATION_STOP`: Subscribe to an event that is triggered when a active conversation has been stopped.
 * - `CONTACT_CREATE`: Subscribe to an event that is triggered when a new contact has been created.
 * - `CONTACT_DELETE`: Subscribe to an event that is triggered when a contact has been deleted.
 * - `CONTACT_MERGE`: Subscribe to an event that is triggered when a two contacts are merged.
 * - `CONTACT_UPDATE`: Subscribe to an event that is triggered when a contact is updated.
 * - `UNSUPPORTED`: Subscribe to callbacks that are not natively supported by the Conversation API.
 * - `OPT_IN`: Subscribe to opt_ins. - `OPT_OUT`: Subscribe to opt_outs.
 * - `CAPABILITY`: Subscribe to see get capability results.
 * - `CONVERSATION_DELETE`: Subscribe to get an event when a conversation is deleted.
 * - `CONTACT_IDENTITIES_DUPLICATION`: Subscribe to get an event when contact identity duplications are found during message or event processing.
 */
export type WebhookTrigger = 'UNSPECIFIED_TRIGGER'
  | 'MESSAGE_DELIVERY'
  | 'EVENT_DELIVERY'
  | 'MESSAGE_INBOUND'
  | 'EVENT_INBOUND'
  | 'CONVERSATION_START'
  | 'CONVERSATION_STOP'
  | 'CONTACT_CREATE'
  | 'CONTACT_DELETE'
  | 'CONTACT_MERGE'
  | 'CONTACT_UPDATE'
  | 'UNSUPPORTED'
  | 'OPT_IN'
  | 'OPT_OUT'
  | 'CAPABILITY'
  | 'CONVERSATION_DELETE'
  | 'CONTACT_IDENTITIES_DUPLICATION';
