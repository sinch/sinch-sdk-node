## Version 0.0.2

 - Implement the `CallbackProcessor` interface: when receiving an event callback, it's possible to validate the signature header and to revive the request body into an object.

## Version 0.0.1

 - Update dependency to @sinch/sdk-client to `0.0.1`
 - Update specification
   - ListAvailableRegionsRequestData: `types` became an array
   - ActiveNumberRequest: added the property `callbackUrl`
   - `CallbackConfiguration` tag changed to `Callbacks`
   - Webhooks
     - `CallbackPayload` interface created
     - Add the method `parseNumbersEventNotification` to call when receiving a callback event to transform it into a `CallbackPayload`

# Version 0.0.0

- Initial version
