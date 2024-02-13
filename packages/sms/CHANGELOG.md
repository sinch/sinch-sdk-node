## Version 0.0.2

- Implement the `CallbackProcessor` interface: when receiving an event callback, it's possible to validate the signature header (always valid for this API) and to revive the request body into an object.


## Version 0.0.1

 - Update dependency to @sinch/sdk-client to `0.0.1`
 - Add the method `parseSmsEventNotification` to call when receiving a callback event to transform it into the correct type
