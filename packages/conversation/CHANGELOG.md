## Version 1.4.1
- [Bugfix] Make the lazyClient public in the ConversationService to be able to override it with a custom one.

## Version 1.4.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.4.0`.
- [Tech] Lazy load a single `ApiFetchClient` instance in the `ConversationService`.
- [Feature] Support Calendar Message and Share Location Message types
- [Feature] Support WhatsApp Card message properties
- [Feature] Support "Consents" (List identities and List audit records from content lists)
- [Feature] Support "Project Settings"
- [Feature] Support Identity conflicts listing: `conversation.contact.listIdentityConflicts()`
- [Feature] Support KakaoTalk commerce and carousel commerce messages in the channel-specific messages
- [Feature] Support Line notification template messages in the channel-specific messages
- [Feature] Support various payment buttons for WhatsApp: payment link, dynamic pix and boleto
- [Feature] Support list last messages by channel identity: `conversation.messages.listLastMessagesByChannelIdentity()`
- **Deprecations**
  - Deprecate Viber channel support 
  - Deprecate Templates V1 support as the API is not supported anymore. Only Templates V2 are supported now.

## Version 1.3.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.3.0`.
- [Feature] Fix `MediaProperties` model and support media property
- [Feature] Support channel specific messages for whatsapp messages
- [Feature] Support Line Enterprise credentials
- [Feature] Support `whatsapp_footer` in Choice message and `whatsapp_header` in List message
- [Feature] Support string input when parsing webhook events
- **Deprecations**
  - Inside a Conversation Message, the `message_status` property is deprecated, will be removed in 2.0
  - Create conversation request: `metadata` property is deprecated, will be removed in 2.0
  - Type `IdentifiedByItem` is deprecated, use `ChannelIdentities` instead
  - Interface `EventInboundEvent` is deprecated, use `EventInboundContactEvent` or `EventInboundContactMessageEvent` instead
  - *Warning about future deprecation*: `region` will become mandatory as a configuration parameter

## Version 1.2.1
- [Tech] Update dependency `@sinch/sdk-client` to `1.2.1` 
- [Bugfix] Fix refresh token issue

## Version 1.2.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.2.0`.
- [Bugfix] Fix issue with pagination to iterate over multiple pages.
- [Bugfix] `ListConversationsRequestData`: the property `only_active` becomes optional.
- [Bugfix] Template V2: add an optional `id` property to the `V2Template` interface.
- [Bugfix] `conversations.listRecent()`: Add a page_size value by default. Without it the API returns an empty list.
- [Bugfix][Breaking] `InjectConversationEvent` interface: only `AppEvent` is allowed (`ContactEvent` and `ContactMessageEvent` are no longer allowed).
- [Bugfix][Breaking]
  - Template V2: For "create" and "update" operations, the request bodies interface no longer accept read-only properties.
  - Webhooks: For "create" and "update" operations, the request bodies interface no longer accept read-only properties.
- [E2E] Add Cucumber steps implementation.

## Version 1.1.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.1.0`

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
