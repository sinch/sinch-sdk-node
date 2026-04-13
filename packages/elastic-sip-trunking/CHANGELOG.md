## Version 1.4.1
- [Bugfix] Make the lazyClient public in the ElasticSipTrunkingService to be able to override it with a custom one.

## Version 1.4.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.4.0`.
- [Tech] Lazy load a single `ApiFetchClient` instance in the `ElasticSipTrunkingService`.
- [Feature] Support Call Blocking Rules
- [Feature] Support Credential Lists
- [Feature] Support Export Call history: `elasticSipTrunking.calls.export()`
- [Feature] Support Add projects operation: `elasticSipTrunking.projects.add()`

## Version 1.3.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.3.0`.
- [Feature] Support `RegisteredEndpoint` on top of `StaticEndpoint`: a `SipEndpoint` is now the union of both models
- [Feature] Support `TLS` as a transport option
- [Feature] New properties from a `SipTrunk`: `callForwardNumber` and `enableCallForward`

## Version 1.2.1
- [Tech] Update dependency `@sinch/sdk-client` to `1.2.1`
- [Bugfix] Fix refresh token issue

## Version 1.2.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.2.0`.
- [Feature] Add the method `accessControlList.get()`.
- Calls History:
  - [Bugfix][Breaking] The `DirectionEnum` values are in lower case. E.g: INBOUND -> inbound.
  - [Bugfix][Breaking] The price `amount` is now a `number` instead of a `string`.
  - [Feature] Support date range filter for listing calls.
- [Bugfix][Breaking]
  - ACLs: For "create", "update" and "addIPRange" operations, the request bodies interface no longer accept read-only properties.
  - SIP endpoints: For "create" and "update" operations, the request bodies interface no longer accept read-only properties.
  - SIP Trunks: For "create" and "update" operations, the request bodies interface no longer accept read-only properties.
- [E2E] Add Cucumber steps implementation.

# Version 1.1.0
 - Initial version. Support for:
   - SIP Trunks
   - Access Control List
   - SIP Endpoints
   - Country Permissions
   - Calls
