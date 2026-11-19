# Changelog

All notable changes to the **Sinch Node Numbers SDK** are documented in this file.

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

## Version 1.8.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.8.0`

## Version 1.7.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.7.0`

## Version 1.6.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.6.0` — transport-level settings
- **[feature]** `CallbackPayload` is now a union of `CallbackPayloadActiveNumber` and `CallbackPayloadNumberOrder` (discriminated by `resourceType`)

## Version 1.5.0
- **[design]** Breaking: No longer re-exports `@sinch/sdk-client`. Import SDK client types and helpers from `@sinch/sdk-client` or `@sinch/sdk-core` instead.
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.5.0` — configurable SDK logging
- **[feature]** Add `internalFailureCode` property to `CallbackPayload` for campaign provisioning failure details

## Version 1.4.3
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.3` - OAuth2 429 backoff with full-jitter retry

## Version 1.4.2
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.1` - Harness OAuth2 token refresh

## Version 1.4.1
- **[fix]** Make the lazyClient public in the NumbersService to be able to override it with a custom one.

## Version 1.4.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.4.0`.
- **[tech]** Lazy load a single `ApiFetchClient` instance in the `NumbersService`.
- **[feature]** Support "Emergency Address" for SIP numbers
- **[fix]** Fix non-required parameters for listing rented numbers

## Version 1.3.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.3.0`.
- **[feature]** Support string input when parsing webhook events
- **[feature]** Details of an NotFound error have their own type `NotFoundErrorDetails[]` instead of a generic `object[]`
- **[feature]** Ordering rented number parameter defines its own enum `OrderByEnum`
- **[feature]** Remove unused models: `ListAvailableNumberRequest`, `NumberPatternPattern`, `NumberPatternSearchPattern` and the enum `NumberPatternSearchPatternEnum`
- **Deprecations**:
  - Interface `RentAnyNumberRequestSmsConfiguration` is deprecated, use `SMSConfiguration` instead
  - Interface `RentAnyNumberRequestVoiceConfiguration` is deprecated, use `VoiceConfiguration` instead
  - Type `RegionNumberTypeEnum` is deprecated, use `NumberTypeEnum` instead

## Version 1.2.1
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.1`
- **[fix]** Fix refresh token issue

## Version 1.2.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.0`.
- **[fix]** Remove the "scheduledProvisioning" properties for SMS and Voice in the update number request.
- **[deprecation notice]** `availableNumber` and `activeNumber` subdomain are deprecated and all methods are now defined on the upper numbers service.
   All the methods names are the same except `availableNumber.list()` -> `searchForAvailableNumbers()`

| Deprecated                                           | New                                          |
|------------------------------------------------------|----------------------------------------------|
| `numbersService.availableNumber.checkAvailability()` | `numbersService.checkAvailability()`         |
| `numbersService.availableNumber.list()`              | `numbersService.searchForAvailableNumbers()` |
| `numbersService.availableNumber.rent()`              | `numbersService.rent()`                      |
| `numbersService.availableNumber.rentAny()`           | `numbersService.rentAny()`                   |
| `numbersService.activeNumber.get()`                  | `numbersService.get()`                       |
| `numbersService.activeNumber.list()`                 | `numbersService.list()`                      |
| `numbersService.activeNumber.update()`               | `numbersService.update()`                    |
| `numbersService.activeNumber.release()`              | `numbersService.release()`                   |

- **[test]** Add Cucumber steps implementation.

## Version 1.1.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.1.0`
- **[feature]** Update voiceConfiguration object to support Fax and EST configuration properties

## Version 1.0.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.0.0`

## Version 0.0.5
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.5`
- **[tech]** **[design]** Breaking: Export all model interfaces under the namespace `Numbers`
- **[feature]** Support hostname override
- **[feature]** Support request and response plugins override

## Version 0.0.4
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3
 - **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.3`

## Version 0.0.2

 - **[feature]** Implement the `CallbackProcessor` interface: when receiving an event callback, it's possible to validate the signature header and to revive the request body into an object.
 - **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.2`

## Version 0.0.1

 - **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.1`
 - **[feature]** Update specification
   - ListAvailableRegionsRequestData: `types` became an array
   - ActiveNumberRequest: added the property `callbackUrl`
   - `CallbackConfiguration` tag changed to `Callbacks`
   - Webhooks
     - `CallbackPayload` interface created
     - Add the method `parseNumbersEventNotification` to call when receiving a callback event to transform it into a `CallbackPayload`

## Version 0.0.0

- Initial version
