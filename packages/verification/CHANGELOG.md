## Version 1.2.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.2.0`.
- [Feature] Support the `locale` parameter in the `SmsOptions` interface.
- [Deprecation Notice] In the interface `VerificationStatusByIdentityRequestData`, the property `method` supports ‘flashcall’ on top of ‘flashCall’.
- [Deprecation Notice] All the references to "callout" and "seamless" will be replaced by "phoneCall" and "data" respectively.
  - In the interface `VerificationStatusByIdentityRequestData`, the property `method` supports ‘phonecall’ on top of ‘callout’.
  - API methods:
  
| Deprecated                                | New                                         |
|-------------------------------------------|---------------------------------------------|
| `verifications.startCallout()`            | `verifications.startPhoneCall()`            |
| `verifications.reportCalloutById()`       | `verifications.reportPhoneCallById()`       |
| `verifications.reportCalloutByIdentity()` | `verifications.reportPhoneCallByIdentity()` |
- 
  - Helpers:

| Deprecated                                                 | New                                               |
|------------------------------------------------------------|---------------------------------------------------|
| `startVerificationHelper.buildCalloutRequest()`            | `startVerificationHelper.buildPhoneCallRequest()` |
| `startVerificationHelper.buildSeamlessRequest()`           | `startVerificationHelper.buildDataRequest()`      |
| `reportVerificationByIdHelper.buildCalloutRequest()`       | `startVerificationHelper.buildPhoneCallRequest()` |
| `reportVerificationByIdentityHelper.buildCalloutRequest()` | `startVerificationHelper.buildPhoneCallRequest()` |
-
  - Interfaces

| Deprecated                                                                                                                                                                       | New                                                                                                                                                                                    |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <pre><code>StartCalloutVerificationRequestData {<br/>&nbsp;&nbsp;startVerificationWithCalloutRequestBody: StartVerificationWithCallout;<br/>}</code></pre>                       | <pre><code>StartPhoneCallVerificationRequestData {<br/>&nbsp;&nbsp;startVerificationWithPhoneCallRequestBody: StartVerificationWithPhoneCall;<br/>}</code></pre>                       |
| <pre><code>StartSeamlessVerificationRequestData {<br/>&nbsp;&nbsp;startSeamlessVerificationRequestBody: StartSeamlessVerification;<br/>}</code></pre>                            | <pre><code>StartDataVerificationRequestData {<br/>&nbsp;&nbsp;startDataVerificationRequestBody: StartDataVerification;<br/>}</code></pre>                                              |
| <pre><code>ReportCalloutVerificationByIdRequestData {<br/>&nbsp;&nbsp;reportCalloutVerificationByIdentityRequestBody: CalloutVerificationReportRequest;<br/>}</code></pre>       | <pre><code>ReportPhoneCallVerificationByIdRequestData {<br/>&nbsp;&nbsp;reportPhoneCallVerificationByIdRequestBody: PhoneCallVerificationReportRequest;<br/>}</code></pre>             |
| <pre><code>ReportCalloutVerificationByIdentityRequestData {<br/>&nbsp;&nbsp;reportCalloutVerificationByIdentityRequestBody: CalloutVerificationReportRequest;<br/>}</code></pre> | <pre><code>ReportPhoneCallVerificationByIdentityRequestData {<br/>&nbsp;&nbsp;reportPhoneCallVerificationByIdentityRequestBody: PhoneCallVerificationReportRequest;<br/>}</code></pre> |
| <pre><code>StartVerificationWithCallout {<br/>&nbsp;&nbsp;calloutOptions: CalloutOptions;<br/>}</code></pre>                                                                     | <pre><code>StartVerificationWithPhoneCall {<br/>&nbsp;&nbsp;phoneCallOptions: PhoneCallOptions;<br/>}</code></pre>                                                                     |
| `StartSeamlessVerification`                                                                                                                                                      | `StartDataVerification`                                                                                                                                                                | 
| `CalloutOptions`                                                                                                                                                                 | `PhoneCallOptions`                                                                                                                                                                     |
| `CalloutOptionsSpeech`                                                                                                                                                           | `PhoneCallOptionsSpeech`                                                                                                                                                               |
| `CalloutVerificationStatusResponse`                                                                                                                                              | `PhoneCallVerificationStatusResponse`                                                                                                                                                  |
| `CalloutVerificationReportResponse`                                                                                                                                              | `PhoneCallVerificationReportResponse`                                                                                                                                                  |
| `StartCalloutVerificationResponse`                                                                                                                                               | `StartPhoneCallVerificationResponse`                                                                                                                                                   |
| `CalloutRequestEventResponse`                                                                                                                                                    | `PhoneCallRequestEventResponse`                                                                                                                                                        |
| `CalloutProperties`                                                                                                                                                              | `PhoneCallProperties`                                                                                                                                                                  |
| `CalloutContent`                                                                                                                                                                 | `PhoneCallContent`                                                                                                                                                                     |
- [Deprecation Notice] The interfaces containing `SMS` in uppercase will be replaced with the same name but with `Sms` in PascaleCase:

| Deprecated                    | New                           |
|-------------------------------|-------------------------------|
| VerificationPriceSMS          | VerificationPriceSms          |
| SMSRequestEventResponse       | SmsRequestEventResponse       |
| SMSVerificationStatusResponse | SmsVerificationStatusResponse |
| SMSVerificationReportResponse | SmsVerificationReportResponse |

- [Deprecation Notice] The type `VerificationCallback` becomes `VerificationCallbackEvent` and is accessible on the `Verification` namespace.
```typescript
// Deprecated
handleEvent(event: VerificationCallback, res: Response) {
  console.log(event);
}

// New
handleEvent(event: Verification.VerificationCallbackEvent, res: Response) {
  console.log(event);
}
```
- [Deprecation Notice] The type `TypeEnum` should be replaced with the type `IdentityType`.
- [Deprecation Notice] The type `FlashCallContent` should be replaced with the type `FlashCallProperties`.
- [Deprecation Notice] The type `SmsContent` should be replaced with the type `SmsProperties`.
- [E2E] Add Cucumber steps implementation.

## Version 1.1.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.1.0`

## Version 1.0.0
- [Tech] Update dependency `@sinch/sdk-client` to `1.0.0`
- [Feature] Update SDK from the latest specification
  - Add `smsOptions` and `calloutOptions` to the respective Start Verification operations
  - Update response interfaces for Report Verification operations

## Version 0.0.5
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.5`
- [Tech][Breaking] Export all model interfaces under the namespace `Verification`
- [Feature] Support hostname override
- [Feature] Support request and response plugins override

## Version 0.0.4
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.4`

## Version 0.0.3
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.3`

## Version 0.0.2
- [Tech] Update dependency `@sinch/sdk-client` to `0.0.2`

**Breaking changes**
 - Removal of the method `verifications.start()`, replaced by the methods:
   - `startSms(data: StartSmsVerificationRequestData): Promise<StartSmsVerificationResponse>)`
   - `startFlashCall(data: StartFlashCallVerificationRequestData): Promise<StartFlashCallVerificationResponse>)`
   - `startCallout(data: StartCalloutVerificationRequestData): Promise<StartCalloutVerificationResponse>)`
   - `startSeamless(data: StartSeamlessVerificationRequestData): Promise<StartSeamlessVerificationResponse>)`
 - Removal of the method `verifications.reportById()` replaced by the methods:
   - `reportSmsById(data: ReportSmsVerificationByIdRequestData): Promise<SMSVerificationReportResponse>`
   - `reportFlashCallById(data: ReportFlashCallVerificationByIdRequestData): Promise<FlashCallVerificationReportResponse>`
   - `reportCalloutById(data: ReportCalloutVerificationByIdRequestData): Promise<CalloutVerificationReportResponse>`
 - Removal of the method `verifications.reportByIdentity()` replaced by the methods:
    - `reportSmsByIdentity(data: ReportSmsVerificationByIdentityRequestData): Promise<SMSVerificationReportResponse>`
    - `reportFlashCallByIdentity(data: ReportFlashCallVerificationByIdentityRequestData): Promise<FlashCallVerificationReportResponse>`
    - `reportCalloutByIdentity(data: ReportCalloutVerificationByIdentityRequestData): Promise<CalloutVerificationReportResponse>`
 - Callbacks management: implementation of the `CallbackProcessor` interface
   - Rename `parseVerificationEventNotification` into `parseEvent`
   - Move the header validation to the domain with the method `validateAuthenticationHeader`

## Version 0.0.1
 - [Tech] Update dependency `@sinch/sdk-client` to `0.0.1`
 - [Feature] Add the method `parseVerificationEventNotification` to call when receiving a callback event to transform it into the correct type

# Version 0.0.0
- Initial version. Support for:
  - start verification
  - report verification
  - get verification status
