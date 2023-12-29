# Simple examples with the Sinch Node.js SDK

This directory contains some code samples to illustrate how to use the services supported in the Sinch Node.js SDK.

## Prerequisites

Before trying to run a sample, make sure you have Node.js installed: please download and install the LTS version from [nodejs.org](https://nodejs.org).

Once installed, check you can run node with the following command:

```bash
node --version
```

You should see a result such as `v20.10.0`, matching the LTS you have downloaded or the version you had previously installed.

To use the Sinch Node.js SDK packages, you will need a package manager such as `NPM` (already installed with Node.js) or `yarn`.

To install `yarn` (optional), run the following command:

```bash
npm install --global yarn
```

## Configuration

To be able to send requests to the Sinch APIs, you need to have a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

With the credentials found on the Sinch dashboards, you will have to fill the file `.env.template` and **rename it to `.env`**. This file needs to be located at the same place where you will be executing the sample files.

```properties
# Credentials for APIs using OAuth2 authentication
SINCH_PROJECT_ID=project-id found at https://dashboard.sinch.com/account/access-keys
SINCH_KEY_ID=access-key-id found at https://dashboard.sinch.com/account/access-keys
SINCH_KEY_SECRET=access-key-secret found at access-key creation time
# Credentials for legacy SMS API usage
SINCH_SERVICE_PLAN_ID=service-plan-id found at https://dashboard.sinch.com/sms/api/services
SINCH_API_TOKEN=api-token found at https://dashboard.sinch.com/sms/api/services
# Application credentials for Verification and Voice APIs
SINCH_APPLICATION_KEY=application-key found at https://dashboard.sinch.com/verification/apps
SINCH_APPLICATION_SECRET=application-secret found at https://dashboard.sinch.com/verification/apps
# Properties to fill according to some API responses
PHONE_NUMBER=phone-number to fill with one of your numbers rented with the Numbers API
RECIPIENT_PHONE_NUMBER=phone-number to fill with the number to which you want to send a batch with the SMS API
BATCH_ID=batch-id to fill with one the batches created with the SMS API
GROUP_ID=group-id to fill with one of the groups created with the SMS API
INBOUND_ID=inbound-id to fill with one of the ids found when listing inbound messages with the SMS API
VERIFICATION_ID=verification-id to fill with the verification started with the Verification API
VERIFICATION_IDENTITY=verification-identity to fill with the identity of the user
VERIFICATION_REFERENCE=verification-reference to add when starting a verification or getting its status
VERIFICATION_CODE=verification-code received for a verification via SMS or callout
VERIFICATION_CLI=verification-cli received for a verification via flashCall
CALL_ID=call_id to fill with one of the callouts created with the Voice API
CONFERENCE_ID=unique identifier of the conference you want to interact with
```

**Note**: If you prefer using environment variables, the sample app is also supporting them: they take precedence over the value from the `.env` file.

## Execution
You will find all the scripts in the `package.json` file to run the samples.

### With NPM

```bash
npm run numbers:regions:list
```

### With Yarn

```bash
yarn run numbers:regions:list
```

**Note**: You can add the option `pretty` at the end of the command to display a processed output from the raw JSON response (e.g. `yarn run numbers:regions:list pretty`) 

## Available sample applications

| Domain       | Service             | Sample application name and location                                                                                                       | Required parameters                                                             |
|--------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Numbers      | Regions             | [./src/numbers/regions/list.ts](./src/numbers/regions/list.ts)                                                                             |                                                                                 |
|              | Available           | [./src/numbers/available/list.ts](./src/numbers/available/list.ts)                                                                         |                                                                                 |
|              |                     | [./src/numbers/available/checkAvailability.ts](./src/numbers/available/checkAvailability.ts)                                               | `PHONE_NUMBER`                                                                  |
|              |                     | [./src/numbers/available/rent.ts](./src/numbers/available/rent.ts)                                                                         | `PHONE_NUMBER`                                                                  |
|              |                     | [./src/numbers/available/rentAny.ts](./src/numbers/available/rentAny.ts)                                                                   |                                                                                 |
|              | Active              | [./src/numbers/active/list.ts](./src/numbers/active/list.ts)                                                                               |                                                                                 |
|              |                     | [./src/numbers/active/get.ts](./src/numbers/active/get.ts)                                                                                 | `PHONE_NUMBER`                                                                  |
|              |                     | [./src/numbers/active/update.ts](./src/numbers/active/update.ts)                                                                           | `PHONE_NUMBER`                                                                  |
|              |                     | [./src/numbers/active/release.ts](./src/numbers/active/release.ts)                                                                         | `PHONE_NUMBER`                                                                  |
|              | Callback            | [./src/numbers/callback/get.ts](./src/numbers/callback/get.ts)                                                                             |                                                                                 |
|              |                     | [./src/numbers/callback/update.ts](./src/numbers/callback/update.ts)                                                                       |                                                                                 |
| SMS          | Groups              | [./src/sms/groups/list/list.ts](./src/sms/groups/list/list.ts)                                                                             |                                                                                 |
|              |                     | [./src/sms/groups/create/create.ts](./src/sms/groups/create/create.ts)                                                                     |                                                                                 |
|              |                     | [./src/sms/groups/get/get.ts](./src/sms/groups/get/get.ts)                                                                                 | `GROUP_ID`                                                                      |
|              |                     | [./src/sms/groups/getPhoneNumbers/getPhoneNumbers.ts](./src/sms/groups/getPhoneNumbers/getPhoneNumbers.ts)                                 | `GROUP_ID`                                                                      |
|              |                     | [./src/sms/groups/replace/replace.ts](./src/sms/groups/replace/replace.ts)                                                                 | `GROUP_ID`                                                                      |
|              |                     | [./src/sms/groups/update/update.ts](./src/sms/groups/update/update.ts)                                                                     | `GROUP_ID`                                                                      |
|              |                     | [./src/sms/groups/delete/delete.ts](./src/sms/groups/delete/delete.ts)                                                                     | `GROUP_ID`                                                                      |
|              | Batches             | [./src/sms/batches/send.ts](./src/sms/batches/send.ts)                                                                                     | `RECIPIENT_PHONE_NUMBER`                                                        |
|              |                     | [./src/sms/batches/list.ts](./src/sms/batches/list.ts)                                                                                     |                                                                                 |
|              |                     | [./src/sms/batches/dry-run.ts](./src/sms/batches/dry-run.ts)                                                                               | `RECIPIENT_PHONE_NUMBER`                                                        |
|              |                     | [./src/sms/batches/get.ts](./src/sms/batches/get.ts)                                                                                       | `BATCH_ID`                                                                      |
|              |                     | [./src/sms/batches/update.ts](./src/sms/batches/update.ts)                                                                                 | `BATCH_ID`                                                                      |
|              |                     | [./src/sms/batches/replace.ts](./src/sms/batches/replace.ts)                                                                               | `BATCH_ID`                                                                      |
|              |                     | [./src/sms/batches/cancel.ts](./src/sms/batches/cancel.ts)                                                                                 | `BATCH_ID`                                                                      |
|              |                     | [./src/sms/batches/delivery-feedback.ts](./src/sms/batches/delivery-feedback.ts)                                                           | `BATCH_ID`                                                                      |
|              | DeliveryReports     | [./src/sms/delivery-reports/list.ts](./src/sms/delivery-reports/list.ts)                                                                   |                                                                                 |
|              |                     | [./src/sms/delivery-reports/getByBatchId.ts](./src/sms/delivery-reports/getByBatchId.ts)                                                   | `BATCH_ID`                                                                      |
|              |                     | [./src/sms/delivery-reports/getByPhoneNumber.ts](./src/sms/delivery-reports/getByPhoneNumber.ts)                                           | `BATCH_ID`, `RECIPIENT_PHONE_NUMBER`                                            |
|              | Inbounds            | [./src/sms/inbounds/list.ts](./src/sms/inbounds/list.ts)                                                                                   |                                                                                 |
|              |                     | [./src/sms/inbounds/get.ts](./src/sms/inbounds/get.ts)                                                                                     | `INBOUND_ID`                                                                    |
| Verification | Verifications       | [./src/verification/verifications/start.ts](./src/verification/verifications/start.ts)                                                     | `VERIFICATION_IDENTITY` + `VERIFICATION_REFERENCE`                              |
|              |                     | [./src/verification/verifications/report-with-id_.ts](./src/verification/verifications/report-with-id.ts)                                  | `VERIFICATION_ID` + `VERIFICATION_CODE` or `VERIFICATION_CLI` (flashCall)       |
|              |                     | [./src/verification/verifications/report-with-identity.ts](./src/verification/verifications/report-with-identity.ts)                       | `VERIFICATION_IDENTITY` + `VERIFICATION_CODE` or `VERIFICATION_CLI` (flashCall) |
|              | Verification-status | [./src/verification/verification-status/verification-by-id.ts](./src/verification/verification-status/verification-by-id.ts)               | `VERIFICATION_ID`                                                               |
|              |                     | [./src/verification/verification-status/verification-by-identity.ts](./src/verification/verification-status/verification-by-identity.ts)   | `VERIFICATION_IDENTITY`                                                         |
|              |                     | [./src/verification/verification-status/verification-by-reference.ts](./src/verification/verification-status/verification-by-reference.ts) | `VERIFICATION_REFERENCE`                                                        |
| Voice        | Applications        | [./src/voice/applications/assignNumbers.ts](./src/voice/applications/assignNumbers.ts)                                                     | `PHONE_NUMBER` + `SINCH_APPLICATION_KEY`                                        |
|              |                     | [./src/voice/applications/getCallbackURLs.ts](./src/voice/applications/getCallbackURLs.ts)                                                 | `SINCH_APPLICATION_KEY`                                                         |
|              |                     | [./src/voice/applications/getNumbers.ts](./src/voice/applications/getNumbers.ts)                                                           |                                                                                 |
|              |                     | [./src/voice/applications/queryNumber.ts](./src/voice/applications/queryNumber.ts)                                                         | `PHONE_NUMBER`                                                                  |
|              |                     | [./src/voice/applications/unassignNumber.ts](./src/voice/applications/unassignNumber.ts)                                                   | `PHONE_NUMBER` + `SINCH_APPLICATION_KEY`                                        |
|              |                     | [./src/voice/applications/updateCallbackURLs.ts](./src/voice/applications/updateCallbackURLs.ts)                                           | `SINCH_APPLICATION_KEY`                                                         |
|              | Callouts            | [./src/voice/callouts/conference.ts](./src/voice/callouts/conference.ts)                                                                   | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER` + `CONFERENCE_ID`                     |
|              |                     | [./src/voice/callouts/custom.ts](./src/voice/callouts/custom.ts)                                                                           | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER`                                       |
|              |                     | [./src/voice/callouts/tts.ts](./src/voice/callouts/tts.ts)                                                                                 | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER`                                       |
|              | Calls               | [./src/voice/calls/get.ts](./src/voice/calls/get.ts)                                                                                       | `CALL_ID`                                                                       |
|              |                     | [./src/voice/calls/manageWithCallLeg.ts](./src/voice/calls/manageWithCallLeg.ts)                                                           | `CALL_ID`                                                                       |
|              |                     | [./src/voice/calls/update.ts](./src/voice/calls/update.ts)                                                                                 | `CALL_ID`                                                                       |
|              | Conferences         | [./src/voice/conferences/get.ts](./src/voice/conferences/get.ts)                                                                           | `CONFERENCE_ID`                                                                 |
|              |                     | [./src/voice/conferences/kickAll.ts](./src/voice/conferences/kickAll.ts)                                                                   | `CONFERENCE_ID`                                                                 |
|              |                     | [./src/voice/conferences/kickParticipant.ts](./src/voice/conferences/kickParticipant.ts)                                                   | `CONFERENCE_ID` + `CALL_ID`                                                     |
|              |                     | [./src/voice/conferences/manageParticipant.ts](./src/voice/conferences/manageParticipant.ts)                                               | `CONFERENCE_ID` + `CALL_ID`                                                     |

