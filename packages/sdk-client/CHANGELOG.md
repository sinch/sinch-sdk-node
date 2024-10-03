## Version 1.2.0
- [Feature] Support a new mode of pagination to support the Conversation API.
- [Feature] Remove the `TimezoneResponse` plugin and autocorrect the timezones when reviving the dates in the API responses.
- [Feature] Add utility methods to support the dateRange filters for EST and Fax APIs.
- [Bugfix] Handle HTTP status 202 in the `ExceptionResponse` plugin.
- [Feature][Functionality change] Implement new strategy for selecting which credentials to use with the SMS API.
- [Deprecation Notice] The property `forceOAuth2ForSmsApi` in the `UnifiedCredentials` is deprecated and has no effect anymore.
- [Deprecation Notice] The property `forceServicePlanIdUsageForSmsApi` in the `ServicePlanIdCredentials` is deprecated and has no effect anymore.

## Version 1.1.0
- [Feature] Add new pagination type support specific to EST

## Version 1.0.0
- No change

## Version 0.0.5
 - [Tech] Break circular dependencies
 - [Tech][Breaking] Rename `basepath` with `hostname` in the `ApiClientOptions` interface
 - [Feature] Support hostname override: new properties added in the `SinchClientParameters` interface
 - [Feature] Support request and response plugins override: new properties added in the `SinchClientParameters` interface
 - [Feature] Create new functions to build the `ApiClientOptions` for each kind of authentication: `buildOAuth2ApiClientOptions`, `buildApplicationSignedApiClientOptions`, `buildFlexibleOAuth2OrApiTokenApiClientOptions`
 - [Feature][Breaking] Remove the enum `Region` and create flexible enums for API regions: `ConversationRegion`, `FaxRegion`, `SmsRegion` and `VoiceRegion`

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
