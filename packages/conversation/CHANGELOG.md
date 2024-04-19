## Version 1.0.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.0.0`
- [Feature][Breaking TS] Refactor `OmniMessage` interface to `OmniMessageOverride` to highlight its override nature
- [Feature][Breaking TS] Refactor the `section` array elements interface of a "List Message": the new interfaces are now called `ChoiceItemWrapper` and `ProductItemWrapper` and contain a `ChoiceItem` and a `ProductItem` in their respective properties `choice` and `product`
- [Feature] Add helpers to build `ChoiceItemWrapper` and `ProductItemWrapper` objects.

## Version 0.0.5
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.5`
- [Tech][Breaking] Export all model interfaces under the namespace `Conversation`
- [Feature] Update SDK with latest version of the API
  - Support `channel_specific_message` property in the `AppMessage` interface and the WhatsApp flow messages
  - Support `channel_specific_message` and `product_response_message` properties in the `ContactMessage` interface and the WhatsApp interactive NFM reply
- [Bugfix][Breaking] remove `AppMessageMessage` interface and reconciliate the model in the `AppMessage` interface 
- [Feature] Support hostname override
- [Feature] Support request and response plugins override
- [Feature][Breaking] Change the usage of `Region` to the more specific `ConversationRegion`
- [Feature] `ttl` property in `SendMessageRequest` interface: enhance developer experience by allowing to input directly a number or a string representing a number. the SDK will take care of rhe formatting expected by the backend

## Version 0.0.4
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.4`

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
