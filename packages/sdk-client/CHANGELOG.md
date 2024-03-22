## Version 0.0.4
 - [Bugfix] Embed `form-data` dependency

## Version 0.0.3
 - [Bugfix] Do not transform a timestamp to a Date object in the timezone plugin, this is already done in the reviver for API responses (regression from v0.0.2)

## Version 0.0.2

 - [Feature] Add interface `CallbackProcessor` to be implemented by each API defining webhooks for callbacks.
 - [Feature] Add `validateSignatureHeader` function to check whether a callback event with a `X-Sinch-Signature` header has been tampered with or not
 - [Feature] Add `Date` reviver for API responses

## Version 0.0.1

 - [Feature] Add method `formatQueryParameter` that take an optional boolean parameter `repeatParamArray` to decide how to represent parameters arrays in the URL as all the APIs are not consistent
 - [Tech] Refactor `imports` and `exports` to break the circular dependencies introduced by the automatic refresh token mechanism
 - [Feature] Add `TimezoneResponse` plugin to the list of default plugins to patch responses where the server doesn't send a timezone in a timestamp property
 - [Feature] Add `validateAuthenticationHeader` function to check whether a callback event has been tampered with or not

# Version 0.0.0

- Initial version
