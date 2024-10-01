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
