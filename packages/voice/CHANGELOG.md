# Changelog

All notable changes to the **Sinch Node Voice SDK** are documented in this file.

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
- **[design]** Breaking: Voice v2 `MenuItem.onFail` renamed to `onFailure` to match the API
- **[fix]** Voice v2 `batches.start` now calls `POST /v2/projects/{projectId}/batches` (the API moved batch creation off `/calls`)
- **[feature]** Voice v2 `BatchDetails` sessions expose the `parameters` used to start each session
- **[feature]** Voice v2 `ServiceResponse` exposes `serviceSecret` (returned by `services.create`, `services.get` and `services.update`)
- **[feature]** Voice v2 `commands` on `CallRequest`, `CallPatchRequest` and `BatchRequest` accept a single SVAML command or a list
- **[tech]** Voice v2 `WebhookRequest.call` is now required; `parseEvent()` throws for events without a `call` object
- **[feature]** Voice v2 helpers:
  - Sinch Events: `VoiceV2CallbackWebhooks`
  - Services: `CallBehaviorHelper`
  - SVAML: `CommandsSequenceCreator`
  - Destination: `Destination`
  - `VoiceName` for `ttsVoice` and `say.voiceName`
  - Commands: `Calls`, `Recording`, `Amd`, `Webhook`, `Menu`, `Messages`

## Version 1.6.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.6.0` — transport-level settings
- **[feature]** Support Voice API v2:
  - Calls: `start`, `list`, `get`, `interactByCallId`, `interactByCallName`
  - Batches: `start`, `get`, `getDetails`, `stop`
  - Sessions: `get`
  - Services: `list`, `create`, `get`, `update`, `delete`
  - Payloads (SVAML): `describe`, `validate`
  - Callback Webhooks: `parseEvent`, `validateAuthenticationHeader`, `serializeResponse`

## Version 1.5.0
- **[design]** Breaking: No longer re-exports `@sinch/sdk-client`. Import SDK client types and helpers from `@sinch/sdk-client` or `@sinch/sdk-core` instead.
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.5.0` — configurable SDK logging
- **[feature]** Add `ManagedCallSvamlRequestBody` and `ManagedCallSvamlAction` types for managing ongoing calls via `updateCall` and `manageCallWithCallLeg`
- **[deprecation notice]** `SVAMLRequestBody` is deprecated in favor of context-specific SVAML types (`ManagedCallSvamlRequestBody`, `AceResponse`, `IceResponse`, `PieResponse`)

## Version 1.4.3
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.3` - OAuth2 429 backoff with full-jitter retry

## Version 1.4.2
- **[fix]** Update dependency `@sinch/sdk-client` to `1.4.1` - Harness OAuth2 token refresh

## Version 1.4.1
- **[fix]** Make the lazyClient public in the VoiceService to be able to override it with a custom one.

## Version 1.4.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.4.0`.
- **[tech]** Lazy load a single `ApiFetchClient` instance in the `VoiceService`.
- **[feature]** Support `streamingOptions` in the `connectStream` SVAML action

## Version 1.3.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.3.0`.
- **[feature]** Add enum values for properties previsously defined as `string`
- **[feature]** Support Voice ICE instruction `stopRecording`
- **[feature]** Support Voice PIE action `connectPstn`
- **[feature]** Support Voice ICE action `connectStream` (beta feature)
- **[feature]** Support string input when parsing webhook events
- **Deprecations**
  - Interface `Participant` is deprecated, use `Destination` instead
  - Endpoint `QueryNumber` is deprecated, it will be replaced by the `NumberLookup` API

## Version 1.2.1
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.1`
- **[fix]** Fix refresh token issue

## Version 1.2.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.2.0`.
- **[feature]** In the interface `Participant`, the property `type` defines a list of string values on top of a generic string.
- **[design]** Breaking: In the interface `ConferenceCalloutRequest`, the property `mohClass` was declared as a `string` and is now a `MusicOnHold` type;
- **[deprecation notice]** The type `VoiceCallback` becomes `VoiceCallbackEvent` and is accessible on the `Voice` namespace.

| Deprecated                                                                                                           | New                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| <pre><code>handleEvent(event: VoiceCallback, res: Response) {<br/>&nbsp;&nbsp;console.log(event);<br/>}</code></pre> | <pre><code>handleEvent(event: Voice.VoiceCallbackEvent, res: Response) {<br/>&nbsp;&nbsp;console.log(event);<br/>}</code></pre> |

- **[test]** Add Cucumber steps implementation.

## Version 1.1.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.1.0`

## Version 1.0.0
- **[dependency]** Update dependency `@sinch/sdk-client` to `1.0.0`

## Version 0.0.5
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.5`
- **[tech]** **[design]** Breaking: Export all model interfaces under the namespace `Voice`
- **[feature]** Support hostname override
- **[feature]** Support request and response plugins override

## Version 0.0.4
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.3`

# Version 0.0.2
- **[dependency]** Update dependency `@sinch/sdk-client` to `0.0.2`
- **[feature]** [Helpers](./src/models/v1/helper.ts) for SVAML actions and instructions building for ICE, ACE and PIE
- **[feature]** `call()` function is also available under the `conferences` service.

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
