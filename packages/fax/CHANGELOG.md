# Changelog

All notable changes to the **Sinch Node Fax SDK** are documented in this file.

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
- **[feature]** Support suspending a number on a service via `services.suspendNumber()`, returning a `SuspendPhoneNumberResponse`
- **[feature]** Support `fromCountry` and `toCountry` filters on fax list and export requests via `FaxesFilterRequestData`
- **[feature]** Support `fromCountry` and `toCountry` in a `Fax` object
- **[feature]** Support `country`, `suspended` and `note` in a `ServicePhoneNumber` object
- **[feature]** Support `createdAt` and `updatedAt` in a `CoverPage` object
- **[feature]** `coverPages.list()` returns the new `CoverPageInfo` model, a cover page without its `file`, as returned by the API (use `coverPages.get()` to retrieve the file). Code typing the list result as `PageResult<CoverPage>` or `CoverPage[]` must use `CoverPageInfo` instead
- **[fix]** The `hasFile` property in a `Fax` object is typed as `boolean` instead of `string`, to match the value returned by the API

## Version 1.7.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.7.0`

## Version 1.6.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.6.0` — transport-level settings

## Version 1.5.0
- **[design]** Breaking: No longer re-exports `@sinch/sdk-client`. Import SDK client types and helpers from `@sinch/sdk-client` or `@sinch/sdk-core` instead.
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.5.0` — configurable SDK logging
- **[feature]** Support `labels` filter on fax list and export requests via `FaxesFilterRequestData`
- **[feature]** Support exporting fax lists as CSV via `faxes.exportList()`
- **[deprecation notice]** The `fileFormat` parameter on `downloadContent` is deprecated; call `downloadContent` without `fileFormat`

## Version 1.4.3
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.3` - OAuth2 429 backoff with full-jitter retry

## Version 1.4.2
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.1` - Harness OAuth2 token refresh

## Version 1.4.1
- **[fix]** Make the lazyClient public in the FaxService to be able to override it with a custom one.

## Version 1.4.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.4.0`.
- **[tech]** Lazy load a single `ApiFetchClient` instance in the `FaxService`.
- **[fix]** Fix pagination parameters
- **[feature]** Support "Cover Pages"
- **[feature]** Update models properties according the latest API changes

## Version 1.3.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.3.0`.
- **[fix]** By transitivity, upgrading `@sinch/sdk-client` to `1.3.0`, it fixes the issue [#183](https://github.com/sinch/sinch-sdk-node/issues/183)
- **[design]** Breaking: `faxToEmail` endpoints require a `serviceId` as mandatory path parameter
- **[design]** Breaking: the `phoneNumbers` property for an `EmailRequest` is not a `string[]` anymore but a `NumberWithPermissions[]`
- **[feature]** Support string input when parsing webhook events
- **[feature]** Support `resolution`, `coverPageId`, `coverPageData` and `pagesSentSuccessfully` in a `Fax` object
- **[feature]** Support `resolution`, `coverPageId` in a `Service` object
- **Deprecations**
  - `emails` subdomain is deprecated, use `faxToEmail` instead

## Version 1.2.1
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.1`
- **[fix]** Fix refresh token issue

## Version 1.2.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.0`.
- **[feature]** Support date range filter for listing faxes.
- **[feature]** Add `emails.listForNumber()` method (identical to `services.listEmailsForNumber()`).
- **[fix]** Fix `faxes.send()` to send one or several faxes over JSON or FormData. Add examples in the [simple-examples](https://github.com/sinch/sinch-sdk-node/tree/main/examples/simple-examples/src/fax/faxes) package.
- **[feature]** **[design]** Breaking: Update interfaces according to OAS updates.
- **[test]** Add Cucumber steps implementation.

## Version 1.1.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.1.0`

## Version 1.0.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.0.0`

## Version 0.0.5
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.5`
- **[tech]** **[design]** Breaking: Export all model interfaces under the namespace `Fax`
- **[fix]** Fix pagination
- **[fix]** Fix content format sent when using `multipart/form-data`: boolean is not allowed
- **[feature]** Support hostname override
- **[feature]** Support request and response plugins override
- **[feature]** Support regions in the URL

## Version 0.0.4
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3

- Initial version. Support for:
  - Services management
  - Fax sending
  - Fax on emails
  - Callback webhooks
