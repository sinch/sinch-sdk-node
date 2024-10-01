## Version 1.2.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.2.0`.
- [Feature] In the interface `Participant`, the property `type` defines a list of string values on top of a generic string.
- [Breaking] In the interface `ConferenceCalloutRequest`, the property `mohClass` was declared as a `string` and is now a `MusicOnHold` type;
- [Deprecation Notice] The type `VoiceCallback` becomes `VoiceCallbackEvent` and is accessible on the `Voice` namespace.

| Deprecated                                                                                                           | New                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| <pre><code>handleEvent(event: VoiceCallback, res: Response) {<br/>&nbsp;&nbsp;console.log(event);<br/>}</code></pre> | <pre><code>handleEvent(event: Voice.VoiceCallbackEvent, res: Response) {<br/>&nbsp;&nbsp;console.log(event);<br/>}</code></pre> |

- [E2E] Add Cucumber steps implementation.

## Version 1.1.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.1.0`

## Version 1.0.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.0.0`

## Version 0.0.5
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.5`
- [Tech][Breaking] Export all model interfaces under the namespace `Voice`
- [Feature] Support hostname override
- [Feature] Support request and response plugins override

## Version 0.0.4
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.3`

# Version 0.0.2
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.2`
- [Feature] [Helpers](./src/models/v1/helper.ts) for SVAML actions and instructions building for ICE, ACE and PIE
- [Feature] `call()` function is also available under the `conferences` service.

**Breaking changes**
- Callbacks management: implementation of the `CallbackProcessor` interface
  - Rename `parseVoiceEventNotification` into `parseEvent`
  - Move the header validation to the domain with the method `validateAuthenticationHeader`

# Version 0.0.1
- Initial version. Support for:
  - Voice application management
  - Callouts: TTS, Conference and Custom
  - Calls management
  - Conference management
  - Callback webhooks
