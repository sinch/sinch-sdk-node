# Changelog

All notable changes to the **Sinch Node SDK** are documented in this file.

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
- **[feature]** Add `sinch.http`, a low-level HTTP client to call any Sinch endpoint, including those not covered by the SDK. See the README for its usage and limitations
- **[tech]** Stop exporting `./package.json`. Nothing in the SDK imports `@sinch/sdk-core/package.json` anymore

## Version 1.8.0
- **[dependency]** Update dependency `@sinch/conversation` to version `1.8.0`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.8.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.8.0`
- **[dependency]** Update dependency `@sinch/numbers` to version `1.8.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.8.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.8.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.8.0`
- **[dependency]** Update dependency `@sinch/number-lookup` to version `1.8.0`
- **[dependency]** Update dependency `@sinch/provisioning` to version `1.8.0`

## Version 1.7.0
- **[dependency]** Update dependency `@sinch/conversation` to version `1.7.0`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.7.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.7.0`
- **[dependency]** Update dependency `@sinch/numbers` to version `1.7.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.7.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.7.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.7.0`
- **[dependency]** Update dependency `@sinch/number-lookup` to version `1.7.0`
- **[dependency]** Update dependency `@sinch/provisioning` to version `1.7.0`

## Version 1.6.0
- **[deprecation notice]** Elastic SIP Trunking (`elasticSipTrunking`, `@sinch/elastic-sip-trunking`) is deprecated and will be removed in version 2 of the SDK.
- **[dependency]** Update dependency `@sinch/sdk-client` to version `1.6.0`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.6.0`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.6.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.6.0`
- **[dependency]** Update dependency `@sinch/numbers` to version `1.6.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.6.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.6.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.6.0`
- **[dependency]** Update dependency `@sinch/number-lookup` to version `1.6.0`

## Version 1.5.0
- **[design]** Breaking: Domain packages no longer re-export `@sinch/sdk-client`. Import SDK client types and helpers from `@sinch/sdk-client` or `@sinch/sdk-core` instead.
- `@sinch/sdk-core` now explicitly re-exports `@sinch/sdk-client` as the single umbrella entry point.
- **[feature]** Configurable HTTP 429 retries (`retryPolicy`, `maxRetryCount`, `exponentialBackoff` on `SinchClientParameters`) via `@sinch/sdk-client`
- **[dependency]** Update dependency `@sinch/sdk-client` to version `1.5.0`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.5.0`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.5.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.5.0`
- **[dependency]** Update dependency `@sinch/numbers` to version `1.5.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.5.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.5.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.5.0`
- **[dependency]** Update dependency `@sinch/number-lookup` to version `1.5.0`

## Version 1.4.3
- **[dependency]** Update dependency `@sinch/conversation` to version `1.4.3`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.4.3`
- **[dependency]** Update dependency `@sinch/fax` to version `1.4.3`
- **[dependency]** Update dependency `@sinch/numbers` to version `1.4.3`
- **[dependency]** Update dependency `@sinch/sms` to version `1.4.3`
- **[dependency]** Update dependency `@sinch/verification` to version `1.4.3`
- **[dependency]** Update dependency `@sinch/voice` to version `1.4.3`
- **[dependency]** Update dependency `@sinch/number-lookup` to version `1.4.3`

## Version 1.4.2
- **[dependency]** Update dependency `@sinch/numbers` to version `1.4.2`
- **[dependency]** Update dependency `@sinch/sms` to version `1.4.2`
- **[dependency]** Update dependency `@sinch/verification` to version `1.4.2`
- **[dependency]** Update dependency `@sinch/voice` to version `1.4.2`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.4.2`
- **[dependency]** Update dependency `@sinch/fax` to version `1.4.2`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.4.2`
- **[dependency]** Update dependency `@sinch/number-lookup` to version `1.4.2`

## Version 1.4.1
- **[dependency]** Update dependency `@sinch/numbers` to version `1.4.1`
- **[dependency]** Update dependency `@sinch/sms` to version `1.4.1`
- **[dependency]** Update dependency `@sinch/verification` to version `1.4.1`
- **[dependency]** Update dependency `@sinch/voice` to version `1.4.1`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.4.1`
- **[dependency]** Update dependency `@sinch/fax` to version `1.4.1`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.4.1`
- **[dependency]** Update dependency `@sinch/number-lookup` to version `1.4.1`

## Version 1.4.0
- **[dependency]** Update dependency `@sinch/numbers` to version `1.4.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.4.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.4.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.4.0`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.4.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.4.0`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.4.0`
- Add support for the Number Lookup V2 API with `@sinch/number-lookup` version `1.4.0`

## Version 1.3.0
- **[dependency]** Update dependency `@sinch/numbers` to version `1.3.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.3.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.3.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.3.0`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.3.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.3.0`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.3.0`

## Version 1.2.1
- **[fix]** Fix refresh token issue
- **[dependency]** Update dependency `@sinch/numbers` to version `1.2.1`
- **[dependency]** Update dependency `@sinch/sms` to version `1.2.1`
- **[dependency]** Update dependency `@sinch/verification` to version `1.2.1`
- **[dependency]** Update dependency `@sinch/voice` to version `1.2.1`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.2.1`
- **[dependency]** Update dependency `@sinch/fax` to version `1.2.1`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.2.1`

## Version 1.2.0
- **[dependency]** Update dependency `@sinch/numbers` to version `1.2.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.2.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.2.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.2.0`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.2.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.2.0`
- **[dependency]** Update dependency `@sinch/elastic-sip-trunking` to version `1.2.0`

## Version 1.1.0
- **[dependency]** Update dependency `@sinch/numbers` to version `1.1.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.1.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.1.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.1.0`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.1.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.1.0`
- Add support for the Elastic SIP Trunking API with `@sinch/elastic-sip-trunking` version `1.1.0`

## Version 1.0.0
- **[dependency]** Update dependency `@sinch/numbers` to version `1.0.0`
- **[dependency]** Update dependency `@sinch/sms` to version `1.0.0`
- **[dependency]** Update dependency `@sinch/verification` to version `1.0.0`
- **[dependency]** Update dependency `@sinch/voice` to version `1.0.0`
- **[dependency]** Update dependency `@sinch/conversation` to version `1.0.0`
- **[dependency]** Update dependency `@sinch/fax` to version `1.0.0`

## Version 0.0.5
- **[dependency]** Update dependency `@sinch/numbers` to version `0.0.5`
- **[dependency]** Update dependency `@sinch/sms` to version `0.0.5`
- **[dependency]** Update dependency `@sinch/verification` to version `0.0.5`
- **[dependency]** Update dependency `@sinch/voice` to version `0.0.5`
- **[dependency]** Update dependency `@sinch/conversation` to version `0.0.5`
- **[dependency]** Update dependency `@sinch/fax` to version `0.0.5`

## Version 0.0.4
- **[dependency]** Update dependency `@sinch/numbers` to version `0.0.4`
- **[dependency]** Update dependency `@sinch/sms` to version `0.0.4`
- **[dependency]** Update dependency `@sinch/verification` to version `0.0.4`
- **[dependency]** Update dependency `@sinch/voice` to version `0.0.4`
- **[dependency]** Update dependency `@sinch/conversation` to version `0.0.4`
- **[dependency]** Update dependency `@sinch/fax` to version `0.0.4`

## Version 0.0.3
- **[dependency]** Update dependency `@sinch/numbers` to version `0.0.3`
- **[dependency]** Update dependency `@sinch/sms` to version `0.0.3`
- **[dependency]** Update dependency `@sinch/verification` to version `0.0.3`
- **[dependency]** Update dependency `@sinch/voice` to version `0.0.3`
- **[dependency]** Update dependency `@sinch/conversation` to version `0.0.3`
- Add support for the Fax API with `@sinch/fax` version `0.0.3`

## Version 0.0.2
- **[dependency]** Update dependency `@sinch/numbers` to version `0.0.2`
- **[dependency]** Update dependency `@sinch/sms` to version `0.0.2`
- **[dependency]** Update dependency `@sinch/verification` to version `0.0.2`
- **[dependency]** Update dependency `@sinch/voice` to version `0.0.2`
- Add support for the Conversation API with `@sinch/conversation` version `0.0.2`

## Version 0.0.1
 - **[dependency]** Update dependency `@sinch/numbers` to version `0.0.1`
 - **[dependency]** Update dependency `@sinch/sms` to version `0.0.1`
 - **[dependency]** Update dependency `@sinch/verification` to version `0.0.1`
 - Add support for the Voice API with `@sinch/voice` version `0.0.1`
