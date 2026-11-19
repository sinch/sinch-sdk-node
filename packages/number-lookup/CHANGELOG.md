# Changelog

All notable changes to the **Sinch Node Number Lookup SDK** are documented in this file.

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

## Version 1.5.0
- **[design]** Breaking: No longer re-exports `@sinch/sdk-client`. Import SDK client types and helpers from `@sinch/sdk-client` or `@sinch/sdk-core` instead.
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.5.0` — configurable SDK logging

## Version 1.4.3
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.3` - OAuth2 429 backoff with full-jitter retry

## Version 1.4.2
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.1` - Harness OAuth2 token refresh

## Version 1.4.1
- **[fix]** Make the lazyClient public in the NumberLookupService to be able to override it with a custom one.

## Version 1.4.0
- Initial version
