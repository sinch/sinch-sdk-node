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
