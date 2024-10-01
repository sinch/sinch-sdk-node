## Version 1.2.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.2.0`.
- [Feature] Support date range filter for listing faxes.
- [Feature] Add `emails.listForNumber()` method (identical to `services.listEmailsForNumber()`).
- [Bugfix] Fix `faxes.send()` to send one or several faxes over JSON or FormData. Add examples in the [simple-examples](https://github.com/sinch/sinch-sdk-node/tree/main/examples/simple-examples/src/fax/faxes) package.
- [Feature][Breaking] Update interfaces according to OAS updates.
- [E2E] Add Cucumber steps implementation.

## Version 1.1.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.1.0`

## Version 1.0.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.0.0`

## Version 0.0.5
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.5`
- [Tech][Breaking TS] Export all model interfaces under the namespace `Fax`
- [Bugfix] Fix pagination
- [Bugfix] Fix content format sent when using `multipart/form-data`: boolean is not allowed
- [Feature] Support hostname override
- [Feature] Support request and response plugins override
- [Feature] Support regions in the URL

## Version 0.0.4
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3

- Initial version. Support for:
  - Services management
  - Fax sending
  - Fax on emails
  - Callback webhooks
