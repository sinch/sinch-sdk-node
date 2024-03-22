## Version 0.0.3
 - [Feature] Add support for `contact_message_event` for the `injectEvent()` method in the conversation domain
 - [Feature] Add composed methods for sending a message:
   - `sendCardMessage()`
   - `sendCarouselMessage()`
   - `sendChoiceMessage()`
   - `sendContactInfoMessage()`
   - `sendListMessage()`
   - `sendLocationMessage()`
   - `sendMediaMessage()`
   - `sendTemplateMessage()`
   - `sendTextMessage()`
 - [Feature] Add composed methods for sending an event:
   - `sendComposingEvent()`
   - `sendComposingEndEvent()`
   - `sendCommentReplyEvent()`
   - `sendAgentJoinedEvent()`
   - `sendAgentLeftEvent()`
   - `sendGenericEvent()`
 - [Bugfix] Improve `oneOf` handling from the OpenAPI Specification: objects are now mutually exclusive.
 - [Feature][Breaking] Remove support for SMS credentials
 - [Tech] Conversation callback events models: factorize common properties in a super interface
 - [Tech] Update dependency `@sinch/sdk-client` to `0.0.3`

## Version 0.0.2

- Initial version. Support for:
    - Conversation App management
    - Contact management
    - Conversation management
    - Message sending on various channels with various types (including templates v1 and v2) and Message management
    - Events management
    - Message transcoding
    - Capability lookup for a contact
    - Callback webhooks
