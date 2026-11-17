# Changelog

All notable changes to the **Sinch Node SDK Client** are documented in this file.

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
- **[fix]** Read the SDK version for the `User-Agent` header from this package instead of `@sinch/sdk-core`, so installing a domain package alone no longer requires `@sinch/sdk-core`
- **[tech]** Remove the `./version.ts` export. It pointed at `src/version.ts`, which was never part of this package

## Version 1.8.0
- **[releasing]** No changes, version bumped to align with the SDK 1.8.0 release

## Version 1.7.0
- **[releasing]** No changes, version bumped to align with the SDK 1.7.0 release

## Version 1.6.0
- **[feature]** Add `voiceV2Hostname` to `ApiHostname` / `SinchClientParameters` to override the Voice API v2 hostname.
- **[feature]** Add transport-level settings on `SinchClientParameters` (`TransportSettings`).
- **[feature]** Add `PaginationEnum.PAGE_LINK` for Voice API v2 list pagination.
- **[tech]** Internal HTTP transport is based on `HttpRequest`/`HttpResponse` for existing `ApiFetchClient` calls.
- **[deprecation notice]** Mailgun-related settings are deprecated (`MailgunCredentials`, `MailgunRegion`, `SupportedMailgunRegion`, `MAILGUN_HOSTNAME`, `mailgunHostname`, and `buildMailgunApiClientOptions`). Mailgun was never released as a Node SDK product; these settings will be removed in a future major version.
- **[deprecation notice]** `elasticSipTrunkingHostname` is deprecated. Elastic SIP Trunking support will be removed in version 2 of the SDK.

## Version 1.5.0
- **[feature]** Configurable HTTP 429 retries (`retryPolicy`, `maxRetryCount`, `exponentialBackoff` on `SinchClientParameters`) via `WithRetryPolicy` param
- **[feature]** Add configurable SDK logging via the optional `logger` property on `SinchClientParameters` (`WithLogger`): provide a custom `Logger`, default to `console`, or pass `logger: null` to silence output; includes lazy message support, debug logging of failed HTTP responses, and routing of SDK warnings through the configured logger
- **[feature]** Add `FileData` interface as the preferred return type for CSV downloads (`fileName` and `data` properties)
- **[deprecation notice]** `CSVFile` is deprecated in favor of `FileData`
- **[dependency]** Bump `form-data` dependency from `4.0.4` to `4.0.6`

## Version 1.4.2
- **[fix]** OAuth2 429 backoff with full-jitter retry

## Version 1.4.1
- **[fix]** Harness OAuth2 token refresh

## Version 1.4.0
 - **[tech]** Remove `client` attribute from the `Api` interface
 - **[feature]** Add `WithAdditionalProperties` interface to support additional properties in API models
 - **[fix]** Fix token refresh concurrency issue

## Version 1.3.0
- **[feature]** Prepare mailgun support by adding mailgun authentication method
- **[fix]** Fix fetch response status handling for document response (issue [#183](https://github.com/sinch/sinch-sdk-node/issues/183))

## Version 1.2.1
- **[fix]** Fix refresh token issue: during the refreshToken process, a missing binding was causing the API request to not be sent. The token was refreshed properly thought, enabling the later API calls to work.

## Version 1.2.0
- **[feature]** Support a new mode of pagination to support the Conversation API.
- **[feature]** Remove the `TimezoneResponse` plugin and autocorrect the timezones when reviving the dates in the API responses.
- **[feature]** Add utility methods to support the dateRange filters for EST and Fax APIs.
- **[fix]** Handle HTTP status 202 in the `ExceptionResponse` plugin.
- **[feature]** **[design]** Implement new strategy for selecting which credentials to use with the SMS API.
- **[deprecation notice]** The property `forceOAuth2ForSmsApi` in the `UnifiedCredentials` is deprecated and has no effect anymore.
- **[deprecation notice]** The property `forceServicePlanIdUsageForSmsApi` in the `ServicePlanIdCredentials` is deprecated and has no effect anymore.

## Version 1.1.0
- **[feature]** Add new pagination type support specific to EST

## Version 1.0.0
- No change

## Version 0.0.5
 - **[tech]** Break circular dependencies
 - **[tech]** **[design]** Breaking: Rename `basepath` with `hostname` in the `ApiClientOptions` interface
 - **[feature]** Support hostname override: new properties added in the `SinchClientParameters` interface
 - **[feature]** Support request and response plugins override: new properties added in the `SinchClientParameters` interface
 - **[feature]** Create new functions to build the `ApiClientOptions` for each kind of authentication: `buildOAuth2ApiClientOptions`, `buildApplicationSignedApiClientOptions`, `buildFlexibleOAuth2OrApiTokenApiClientOptions`
 - **[feature]** **[design]** Breaking: Remove the enum `Region` and create flexible enums for API regions: `ConversationRegion`, `FaxRegion`, `SmsRegion` and `VoiceRegion`

## Version 0.0.4
 - **[fix]** Embed `form-data` dependency

## Version 0.0.3
 - **[fix]** Do not transform a timestamp to a Date object in the timezone plugin, this is already done in the reviver for API responses (regression from v0.0.2)

## Version 0.0.2

 - **[feature]** Add interface `CallbackProcessor` to be implemented by each API defining webhooks for callbacks.
 - **[feature]** Add `validateSignatureHeader` function to check whether a callback event with a `X-Sinch-Signature` header has been tampered with or not
 - **[feature]** Add `Date` reviver for API responses

## Version 0.0.1

 - **[feature]** Add method `formatQueryParameter` that take an optional boolean parameter `repeatParamArray` to decide how to represent parameters arrays in the URL as all the APIs are not consistent
 - **[tech]** Refactor `imports` and `exports` to break the circular dependencies introduced by the automatic refresh token mechanism
 - **[feature]** Add `TimezoneResponse` plugin to the list of default plugins to patch responses where the server doesn't send a timezone in a timestamp property
 - **[feature]** Add `validateAuthenticationHeader` function to check whether a callback event has been tampered with or not

# Version 0.0.0

- Initial version
