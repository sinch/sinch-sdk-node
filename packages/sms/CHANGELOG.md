# Changelog

All notable changes to the **Sinch Node SMS SDK** are documented in this file.

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
- **[doc]** Replace the community.sinch.com links in the code documentation with their support.sinch.com equivalents

## Version 1.8.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.8.0`

## Version 1.7.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.7.0`

## Version 1.6.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.6.0` — transport-level settings

## Version 1.5.0
- **[design]** Breaking: No longer re-exports `@sinch/sdk-client`. Import SDK client types and helpers from `@sinch/sdk-client` or `@sinch/sdk-core` instead.
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.5.0` — configurable SDK logging

## Version 1.4.3
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.3` - OAuth2 429 backoff with full-jitter retry

## Version 1.4.2
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.1` - Harness OAuth2 token refresh

## Version 1.4.1
- **[fix]** Make the lazyClient public in the SmsService to be able to override it with a custom one.

## Version 1.4.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.4.0`.
- **[tech]** Lazy load a single `ApiFetchClient` instance in the `SmsService`.
- **[test]** Implement E2E tests with `servicePlanId` authentication

## Version 1.3.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.3.0`.
- **[feature]** Fix groups models. Request bodies become mandatory.
- **[feature]** Support `mo_media` message type for inbounds and webhooks
- **[feature]** Add `subject` property to `MediaBody` model
- **[feature]** Add `client_reference`, `feedback_enabled`, `from_ton` and `from_npi` to `ApiUpdateBinaryMtMessage` model
- **[feature]** Support string input when parsing webhook events
- **[feature]** Support webhook signature validation
- **[feature]** Fix channel-specific template model with new interface `ChannelSpecificTemplateReference` where the version is optional
- **Deprecations**
  - Type `DeliveryReportStatusEnum` is deprecated, use `DeliveryReportEnum` instead
  - *Warning about future deprecation*: `region` will become mandatory as a configuration parameter

## Version 1.2.1
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.1`
- **[fix]** Fix refresh token issue

## Version 1.2.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.0`.
- **[feature]** Align "Dry Run" response interface with OAS update: `message_part?: string` becomes `number_of_parts?: number`.
- **[feature]** In the interface `MessageDeliveryStatus`, the property `recipients` becomes optional.
- **[feature]** In the interface `GetDeliveryReportByBatchIdRequestData`, the property `code` can also be a `number` or a `number[]` on top of a `string`.
- **[feature]** In the interface `ListInboundMessagesRequestData`, the property `to` can also be a `string[]` on top of a `string`.
- **[fix]** Remove default values set by the SDK when forging the API request.
- **[fix]** In the interface `UpdateGroupRequest`, the property `name` can also be set to null to remove an existing name set.
- **[deprecation notice]** All variations of a group response (`GroupResponse`, `CreateGroupResponse`, `ReplaceGroupResponse` and `UpdateGroupResponse`) are deprecated and replaced by the unique interface `Group`.
- **[deprecation notice]** In the interface `GetDeliveryReportByPhoneNumberRequestData`, the request parameter `recipient_msisdn` is deprecated and should be replaced by `phone_number`.
- **[deprecation notice]** The "parameters" related interfaces have been updated and the interface `ParameterGroup`uses an index signature to allow for arbitrary keys instead of extending a `Record<string, any>`:

| Deprecated               | New             |
|--------------------------|-----------------|
| ParameterObj             | ParameterGroup  |
| ParameterObjParameterKey | ParameterValues |

- **[test]** Add Cucumber steps implementation.

## Version 1.1.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.1.0`

## Version 1.0.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.0.0`

## Version 0.0.5
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.5`
- **[tech]** **[design]** Breaking: Export all model interfaces under the namespace `Sms`
- **[feature]** Support hostname override
- **[feature]** Support request and response plugins override
- **[feature]** **[design]** Breaking: Change the usage of `Region` to the more specific `SmsRegion`

## Version 0.0.4
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.3`
- **[feature]** Add composed methods for sending a batch: 
  - `sendTextMessage()`
  - `sendBinaryMessage()`
  - `sendMediaMessage()`
- **[feature]** **[design]** Breaking: Rename method `getByPhoneNumber()` to `getForNumber()` in the delivery-reports domain

## Version 0.0.2
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.2`
- Implement the `CallbackProcessor` interface: when receiving an event callback, it's possible to validate the signature header (always valid for this API) and to revive the request body into an object.

## Version 0.0.1
 - **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.1`
 - Add the method `parseSmsEventNotification` to call when receiving a callback event to transform it into the correct type
