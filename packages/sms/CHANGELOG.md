## Version 1.2.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.2.0`.
- [Feature] Align "Dry Run" response interface with OAS update: `message_part?: string` becomes `number_of_parts?: number`.
- [Feature] In the interface `MessageDeliveryStatus`, the property `recipients` becomes optional.
- [Feature] In the interface `GetDeliveryReportByBatchIdRequestData`, the property `code` can also be a `number` or a `number[]` on top of a `string`.
- [Feature] In the interface `ListInboundMessagesRequestData`, the property `to` can also be a `string[]` on top of a `string`.
- [Bugfix] Remove default values set by the SDK when forging the API request.
- [Bugfix] In the interface `UpdateGroupRequest`, the property `name` can also be set to null to remove an existing name set.
- [Deprecation Notice] All variations of a group response (`GroupResponse`, `CreateGroupResponse`, `ReplaceGroupResponse` and `UpdateGroupResponse`) are deprecated and replaced by the unique interface `Group`.
- [Deprecation Notice] In the interface `GetDeliveryReportByPhoneNumberRequestData`, the request parameter `recipient_msisdn` is deprecated and should be replaced by `phone_number`.
- [Deprecation Notice] The "parameters" related interfaces have been updated and the interface `ParameterGroup`uses an index signature to allow for arbitrary keys instead of extending a `Record<string, any>`:

| Deprecated               | New             |
|--------------------------|-----------------|
| ParameterObj             | ParameterGroup  |
| ParameterObjParameterKey | ParameterValues |

- [E2E] Add Cucumber steps implementation.

## Version 1.1.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.1.0`

## Version 1.0.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.0.0`

## Version 0.0.5
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.5`
- [Tech][Breaking] Export all model interfaces under the namespace `Sms`
- [Feature] Support hostname override
- [Feature] Support request and response plugins override
- [Feature][Breaking] Change the usage of `Region` to the more specific `SmsRegion`

## Version 0.0.4
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.3`
- [Feature] Add composed methods for sending a batch: 
  - `sendTextMessage()`
  - `sendBinaryMessage()`
  - `sendMediaMessage()`
- [Feature][Breaking] Rename method `getByPhoneNumber()` to `getForNumber()` in the delivery-reports domain

## Version 0.0.2
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.2`
- Implement the `CallbackProcessor` interface: when receiving an event callback, it's possible to validate the signature header (always valid for this API) and to revive the request body into an object.

## Version 0.0.1
 - [Tech] Update dependency `@sinch/sdk-client` to `0.0.1`
 - Add the method `parseSmsEventNotification` to call when receiving a callback event to transform it into the correct type
