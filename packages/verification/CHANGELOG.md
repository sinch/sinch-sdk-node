## Version 0.0.2

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

 - Update dependency to @sinch/sdk-client to `0.0.1`
 - Add the method `parseVerificationEventNotification` to call when receiving a callback event to transform it into the correct type

# Version 0.0.0

- Initial version
