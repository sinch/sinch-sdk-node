# Changelog

All notable changes to the **Sinch Node Elastic SIP Trunking SDK** are documented in this file.

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
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.9.0`
- **[doc]** Replace the community.sinch.com links in the code documentation with their support.sinch.com equivalents

## Version 1.8.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.8.0`

## Version 1.7.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.7.0`

## Version 1.6.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.6.0` — transport-level settings
- **[deprecation notice]** Elastic SIP Trunking support is deprecated and will be removed in version 2 of the SDK.

## Version 1.5.0
- **[design]** Breaking: No longer re-exports `@sinch/sdk-client`. Import SDK client types and helpers from `@sinch/sdk-client` or `@sinch/sdk-core` instead.
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.5.0` — configurable SDK logging
- **[feature]** Support Phone Numbers API: `elasticSipTrunking.phoneNumbers.list()` and `get()`
- **[feature]** Support listing SIP trunks by access control list: `accessControlList.listTrunks()`
- **[tech]** Call history export (`calls.export()`) now returns `FileData` instead of `CSVFile`
- **[fix]** Allow `updateTime` to be `null` in `PhoneNumber` interface

## Version 1.4.3
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.3` - OAuth2 429 backoff with full-jitter retry

## Version 1.4.2
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.1` - Harness OAuth2 token refresh

## Version 1.4.1
- **[fix]** Make the lazyClient public in the ElasticSipTrunkingService to be able to override it with a custom one.

## Version 1.4.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.4.0`.
- **[tech]** Lazy load a single `ApiFetchClient` instance in the `ElasticSipTrunkingService`.
- **[feature]** Support Call Blocking Rules
- **[feature]** Support Credential Lists
- **[feature]** Support Export Call history: `elasticSipTrunking.calls.export()`
- **[feature]** Support Add projects operation: `elasticSipTrunking.projects.add()`

## Version 1.3.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.3.0`.
- **[feature]** Support `RegisteredEndpoint` on top of `StaticEndpoint`: a `SipEndpoint` is now the union of both models
- **[feature]** Support `TLS` as a transport option
- **[feature]** New properties from a `SipTrunk`: `callForwardNumber` and `enableCallForward`

## Version 1.2.1
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.1`
- **[fix]** Fix refresh token issue

## Version 1.2.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.0`.
- **[feature]** Add the method `accessControlList.get()`.
- Calls History:
  - **[fix]** **[design]** Breaking: The `DirectionEnum` values are in lower case. E.g: INBOUND -> inbound.
  - **[fix]** **[design]** Breaking: The price `amount` is now a `number` instead of a `string`.
  - **[feature]** Support date range filter for listing calls.
- **[fix]** **[design]** Breaking: 
  - ACLs: For "create", "update" and "addIPRange" operations, the request bodies interface no longer accept read-only properties.
  - SIP endpoints: For "create" and "update" operations, the request bodies interface no longer accept read-only properties.
  - SIP Trunks: For "create" and "update" operations, the request bodies interface no longer accept read-only properties.
- **[test]** Add Cucumber steps implementation.

# Version 1.1.0
 - Initial version. Support for:
   - SIP Trunks
   - Access Control List
   - SIP Endpoints
   - Country Permissions
   - Calls
