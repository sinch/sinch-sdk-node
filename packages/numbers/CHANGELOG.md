## Version 1.1.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.1.0`
- [Feature] Update voiceConfiguration object to support Fax and EST configuration properties

## Version 1.0.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.0.0`

## Version 0.0.5
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.5`
- [Tech][Breaking] Export all model interfaces under the namespace `Numbers`
- [Feature] Support hostname override
- [Feature] Support request and response plugins override

## Version 0.0.4
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3
 - [Tech] Update dependency `@sinch/sdk-client` to `0.0.3`

## Version 0.0.2

 - [Feature] Implement the `CallbackProcessor` interface: when receiving an event callback, it's possible to validate the signature header and to revive the request body into an object.
 - [Tech] Update dependency `@sinch/sdk-client` to `0.0.2`

## Version 0.0.1

 - [Tech] Update dependency `@sinch/sdk-client` to `0.0.1`
 - [Feature] Update specification
   - ListAvailableRegionsRequestData: `types` became an array
   - ActiveNumberRequest: added the property `callbackUrl`
   - `CallbackConfiguration` tag changed to `Callbacks`
   - Webhooks
     - `CallbackPayload` interface created
     - Add the method `parseNumbersEventNotification` to call when receiving a callback event to transform it into a `CallbackPayload`

## Version 0.0.0

- Initial version
