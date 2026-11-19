# Changelog

All notable changes to the **Sinch Node Conversation SDK** are documented in this file.

> **Tag legend**
> - `[feature]` — new capability
> - `[fix]` — bug fix
> - `[deprecation notice]` — will be removed in a future release
> - `[dependency]` — third-party library update
> - `[doc]` — documentation only
> - `[test]` — test coverage
> - `[refactor]` — internal restructuring
> - `[releasing]` — release infrastructure
> - `[design]` — API design change
> - `[tech]` — technical improvement

---

## Version 1.9.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.9.0`

## Version 1.8.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.8.0`
- **[feature]** Support Channel Profile helpers by recipient type: `conversation.contact.getChannelProfileByContactId()` and `conversation.contact.getChannelProfileByChannelIdentity()`

## Version 1.7.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.7.0`

## Version 1.6.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.6.0` — transport-level settings
- **[feature]** Support sending new `ReadMessageEvent` events: `sendReadMessageEvent()`
- **[feature]** Support new `display_mode` field on ChoiceBase 
- **[tech]** Templates V2 delete success response is HTTP 204 (no body); method signature unchanged

## Version 1.5.0
- **[design]** Breaking: No longer re-exports `@sinch/sdk-client`. Import SDK client types and helpers from `@sinch/sdk-client` or `@sinch/sdk-core` instead.
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.5.0` — configurable SDK logging

## Version 1.4.3
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.3` - OAuth2 429 backoff with full-jitter retry

## Version 1.4.2
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.1` - Harness OAuth2 token refresh

## Version 1.4.1
- **[fix]** Make the lazyClient public in the ConversationService to be able to override it with a custom one.

## Version 1.4.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.4.0`.
- **[tech]** Lazy load a single `ApiFetchClient` instance in the `ConversationService`.
- **[feature]** Support Calendar Message and Share Location Message types
- **[feature]** Support WhatsApp Card message properties
- **[feature]** Support "Consents" (List identities and List audit records from content lists)
- **[feature]** Support "Project Settings"
- **[feature]** Support Identity conflicts listing: `conversation.contact.listIdentityConflicts()`
- **[feature]** Support KakaoTalk commerce and carousel commerce messages in the channel-specific messages
- **[feature]** Support Line notification template messages in the channel-specific messages
- **[feature]** Support various payment buttons for WhatsApp: payment link, dynamic pix and boleto
- **[feature]** Support list last messages by channel identity: `conversation.messages.listLastMessagesByChannelIdentity()`
- **Deprecations**
  - Deprecate Viber channel support 
  - Deprecate Templates V1 support as the API is not supported anymore. Only Templates V2 are supported now.

## Version 1.3.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.3.0`.
- **[feature]** Fix `MediaProperties` model and support media property
- **[feature]** Support channel specific messages for whatsapp messages
- **[feature]** Support Line Enterprise credentials
- **[feature]** Support `whatsapp_footer` in Choice message and `whatsapp_header` in List message
- **[feature]** Support string input when parsing webhook events
- **Deprecations**
  - Inside a Conversation Message, the `message_status` property is deprecated, will be removed in 2.0
  - Create conversation request: `metadata` property is deprecated, will be removed in 2.0
  - Type `IdentifiedByItem` is deprecated, use `ChannelIdentities` instead
  - Interface `EventInboundEvent` is deprecated, use `EventInboundContactEvent` or `EventInboundContactMessageEvent` instead
  - *Warning about future deprecation*: `region` will become mandatory as a configuration parameter

## Version 1.2.1
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.1` 
- **[fix]** Fix refresh token issue

## Version 1.2.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.0`.
- **[fix]** Fix issue with pagination to iterate over multiple pages.
- **[fix]** `ListConversationsRequestData`: the property `only_active` becomes optional.
- **[fix]** Template V2: add an optional `id` property to the `V2Template` interface.
- **[fix]** `conversations.listRecent()`: Add a page_size value by default. Without it the API returns an empty list.
- **[fix]** **[design]** Breaking: `InjectConversationEvent` interface: only `AppEvent` is allowed (`ContactEvent` and `ContactMessageEvent` are no longer allowed).
- **[fix]** **[design]** Breaking: 
  - Template V2: For "create" and "update" operations, the request bodies interface no longer accept read-only properties.
  - Webhooks: For "create" and "update" operations, the request bodies interface no longer accept read-only properties.
- **[test]** Add Cucumber steps implementation.

## Version 1.1.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.1.0`

## Version 1.0.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.0.0`
- **[feature]** **[design]** Breaking: Refactor `OmniMessage` interface to `OmniMessageOverride` to highlight its override nature
- **[feature]** **[design]** Breaking: Refactor the `section` array elements interface of a "List Message": the new interfaces are now called `ChoiceItemWrapper` and `ProductItemWrapper` and contain a `ChoiceItem` and a `ProductItem` in their respective properties `choice` and `product`
- **[feature]** Add helpers to build `ChoiceItemWrapper` and `ProductItemWrapper` objects.

## Version 0.0.5
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.5`
- **[tech]** **[design]** Breaking: Export all model interfaces under the namespace `Conversation`
- **[feature]** Update SDK with latest version of the API
  - Support `channel_specific_message` property in the `AppMessage` interface and the WhatsApp flow messages
  - Support `channel_specific_message` and `product_response_message` properties in the `ContactMessage` interface and the WhatsApp interactive NFM reply
- **[fix]** **[design]** Breaking: remove `AppMessageMessage` interface and reconciliate the model in the `AppMessage` interface 
- **[feature]** Support hostname override
- **[feature]** Support request and response plugins override
- **[feature]** **[design]** Breaking: Change the usage of `Region` to the more specific `ConversationRegion`
- **[feature]** `ttl` property in `SendMessageRequest` interface: enhance developer experience by allowing to input directly a number or a string representing a number. the SDK will take care of rhe formatting expected by the backend

## Version 0.0.4
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3
 - **[feature]** Add support for `contact_message_event` for the `injectEvent()` method in the conversation domain
 - **[feature]** Add composed methods for sending a message:
   - `sendCardMessage()`
   - `sendCarouselMessage()`
   - `sendChoiceMessage()`
   - `sendContactInfoMessage()`
   - `sendListMessage()`
   - `sendLocationMessage()`
   - `sendMediaMessage()`
   - `sendTemplateMessage()`
   - `sendTextMessage()`
 - **[feature]** Add composed methods for sending an event:
   - `sendComposingEvent()`
   - `sendComposingEndEvent()`
   - `sendCommentReplyEvent()`
   - `sendAgentJoinedEvent()`
   - `sendAgentLeftEvent()`
   - `sendGenericEvent()`
 - **[fix]** Improve `oneOf` handling from the OpenAPI Specification: objects are now mutually exclusive.
 - **[feature]** **[design]** Breaking: Remove support for SMS credentials
 - **[tech]** Conversation callback events models: factorize common properties in a super interface
 - **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.3`

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
