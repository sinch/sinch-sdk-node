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
SMS_REGION=Value to determine according to your use case (default will be 'us')
# Application credentials for Verification and Voice APIs
SINCH_APPLICATION_KEY=application-key found at https://dashboard.sinch.com/verification/apps
SINCH_APPLICATION_SECRET=application-secret found at https://dashboard.sinch.com/verification/apps
# The phone number you will use for your tests
PHONE_NUMBER=phone-number to fill with one of your numbers rented with the Numbers API
NUMBER_CALLBACK_URL=URL to receive callbacks relative a number you own
# Generally, you phone number to interact with the API
RECIPIENT_PHONE_NUMBER=phone-number to fill with the number to which you want to send a batch with the SMS API
## SMS API
BATCH_ID=batch-id to fill with one the batches created with the SMS API
GROUP_ID=group-id to fill with one of the groups created with the SMS API
INBOUND_ID=inbound-id to fill with one of the ids found when listing inbound messages with the SMS API
## Verification API
VERIFICATION_ID=verification-id to fill with the verification started with the Verification API
VERIFICATION_IDENTITY=verification-identity to fill with the identity of the user
VERIFICATION_REFERENCE=verification-reference to add when starting a verification or getting its status
VERIFICATION_CODE=verification-code received for a verification via SMS or callout
VERIFICATION_CLI=verification-cli received for a verification via flashCall
## Voice API
CALL_ID=call_id to fill with one of the callouts created with the Voice API
CONFERENCE_ID=unique identifier of the conference you want to interact with
VOICE_CALLBACK_URL=URL found in the Voice dashboard to handle webhooks
## Conversation API
CONVERSATION_APP_ID=app_id (Conversation App) to fill with one of the Conversation App created with the Conversation API or in the Dashboard
CONVERSATION_CONTACT_ID=contact_id to fill with one of the contacts created by the Contact API or the Conversation API
MESSENGER_USER_ID=identity on the MESSENGER channel (can be found on a desktop by selecting a user: the user id will be in the URL)
MESSENGER_TOKEN=static_token to define credentials for a MESSENGER channel
CONVERSATION_ID=conversation_id to fill with one of the conversations created with the Conversation API
EVENT_ID=event_id to fill with a sent event
MESSAGE_ID=message_id to fill with one of the messages sent or injected with the Conversation API
TEMPLATE_ID=template_id to fill with one of the templates created with the Templates API (v1 or v2)
WEBHOOK_ID=webhook_id to fill with one of the webhooks created with the Conversation API or the Dashboard
WEBHOOK_TARGET=target URL where the events should be sent to
## Fax API
FAX_SERVICE_ID=serviceId to fill with one the fax services created with the Fax API
FAX_ID=id from a sendFax response
FAX_CALLBACK_URL=callback url to override the one defined in the default service or specified service
FAX_EMAIL=email to associate with a phone number to use the fax-to-email functionality
## Elastic SIP Trunking API
SIP_TRUNK_ID=sipTrunkId to fill with one of the SIP trunks created with the Elastic SIP Trunking API
SIP_ENDPOINT_ID=sipEndpointId to fill with one of the SIP endpoints created with the Elastic SIP Trunking API
ACL_ID=accessControlListId to fill with one of the access control lists created with the Elastic SIP Trunking API
IP_RANGE_ID=ipRangeId to fill with one of the IP ranges added to an ACL with the Elastic SIP Trunking API
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

### Number

| Service             | Sample application name and location                                                                                                       | Required parameters                                                                        |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Regions             | [./src/numbers/regions/list.ts](./src/numbers/regions/list.ts)                                                                             |                                                                                            |
| Available           | [./src/numbers/available/list.ts](./src/numbers/available/list.ts)                                                                         |                                                                                            |
|                     | [./src/numbers/available/checkAvailability.ts](./src/numbers/available/checkAvailability.ts)                                               | `PHONE_NUMBER`                                                                             |
|                     | [./src/numbers/available/rent.ts](./src/numbers/available/rent.ts)                                                                         | `PHONE_NUMBER` + `NUMBER_CALLBACK_URL` + `SINCH_SERVICE_PLAN_ID` + `SINCH_APPLICATION_KEY` |
|                     | [./src/numbers/available/rentAny.ts](./src/numbers/available/rentAny.ts)                                                                   | `NUMBER_CALLBACK_URL` + `SINCH_SERVICE_PLAN_ID` + `SINCH_APPLICATION_KEY`                  |
| Active              | [./src/numbers/active/list.ts](./src/numbers/active/list.ts)                                                                               |                                                                                            |
|                     | [./src/numbers/active/get.ts](./src/numbers/active/get.ts)                                                                                 | `PHONE_NUMBER`                                                                             |
|                     | [./src/numbers/active/update.ts](./src/numbers/active/update.ts)                                                                           | `PHONE_NUMBER` + `SINCH_SERVICE_PLAN_ID` + `NUMBER_CALLBACK_URL`                           |
|                     | [./src/numbers/active/release.ts](./src/numbers/active/release.ts)                                                                         | `PHONE_NUMBER`                                                                             |
| Callbacks           | [./src/numbers/callbacks/get.ts](src/numbers/callbacks/get.ts)                                                                             |                                                                                            |
|                     | [./src/numbers/callbacks/update.ts](src/numbers/callbacks/update.ts)                                                                       |                                                                                            |

### SMS

| Service         | Sample application name and location                                                                       | Required parameters                            |
|-----------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| Groups          | [./src/sms/groups/list/list.ts](./src/sms/groups/list/list.ts)                                             |                                                |
|                 | [./src/sms/groups/create/create.ts](./src/sms/groups/create/create.ts)                                     |                                                |
|                 | [./src/sms/groups/get/get.ts](./src/sms/groups/get/get.ts)                                                 | `GROUP_ID`                                     |
|                 | [./src/sms/groups/getPhoneNumbers/getPhoneNumbers.ts](./src/sms/groups/getPhoneNumbers/getPhoneNumbers.ts) | `GROUP_ID`                                     |
|                 | [./src/sms/groups/replace/replace.ts](./src/sms/groups/replace/replace.ts)                                 | `GROUP_ID`                                     |
|                 | [./src/sms/groups/update/update.ts](./src/sms/groups/update/update.ts)                                     | `GROUP_ID`                                     |
|                 | [./src/sms/groups/delete/delete.ts](./src/sms/groups/delete/delete.ts)                                     | `GROUP_ID`                                     |
| Batches         | [./src/sms/batches/send.ts](./src/sms/batches/send.ts)                                                     | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER`      |
|                 | [./src/sms/batches/sendTextMessage.ts](./src/sms/batches/sendTextMessage.ts)                               | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER`      |
|                 | [./src/sms/batches/sendBinaryMessage.ts](./src/sms/batches/sendBinaryMessage.ts)                           | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER`      |
|                 | [./src/sms/batches/sendMediaMessage.ts](./src/sms/batches/sendMediaMessage.ts)                             | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER`      |
|                 | [./src/sms/batches/list.ts](./src/sms/batches/list.ts)                                                     |                                                |
|                 | [./src/sms/batches/dry-run.ts](./src/sms/batches/dry-run.ts)                                               | `RECIPIENT_PHONE_NUMBER`                       |
|                 | [./src/sms/batches/get.ts](./src/sms/batches/get.ts)                                                       | `BATCH_ID`                                     |
|                 | [./src/sms/batches/update.ts](./src/sms/batches/update.ts)                                                 | `BATCH_ID`                                     |
|                 | [./src/sms/batches/replace.ts](./src/sms/batches/replace.ts)                                               | `BATCH_ID`                                     |
|                 | [./src/sms/batches/cancel.ts](./src/sms/batches/cancel.ts)                                                 | `BATCH_ID`                                     |
|                 | [./src/sms/batches/delivery-feedback.ts](./src/sms/batches/delivery-feedback.ts)                           | `BATCH_ID`                                     |
| DeliveryReports | [./src/sms/delivery-reports/list.ts](./src/sms/delivery-reports/list.ts)                                   |                                                |
|                 | [./src/sms/delivery-reports/getByBatchId.ts](./src/sms/delivery-reports/getByBatchId.ts)                   | `BATCH_ID`                                     |
|                 | [./src/sms/delivery-reports/getForNumber.ts](./src/sms/delivery-reports/getForNumber.ts)                   | `BATCH_ID`, `RECIPIENT_PHONE_NUMBER`           |
| Inbounds        | [./src/sms/inbounds/list.ts](./src/sms/inbounds/list.ts)                                                   |                                                |
|                 | [./src/sms/inbounds/get.ts](./src/sms/inbounds/get.ts)                                                     | `INBOUND_ID`                                   |

### Verification

| Service             | Sample application name and location                                                                                                                         | Required parameters                           |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| Start Verifications | [./src/verification/start/start-sms.ts](./src/verification/start/start-sms.ts)                                                                               | `VERIFICATION_IDENTITY`                       |
|                     | [./src/verification/start/start-phonecall.ts](./src/verification/start/start-phonecall.ts)                                                                   | `VERIFICATION_IDENTITY`                       |
|                     | [./src/verification/start/start-flashcall.ts](./src/verification/start/start-flashcall.ts)                                                                   | `VERIFICATION_IDENTITY`                       |
|                     | [./src/verification/start/start-data.ts](./src/verification/start/start-data.ts)                                                                             | `VERIFICATION_IDENTITY`                       |
| Verifications       | [./src/verification/verifications/sms/report-with-id_sms.ts](./src/verification/verifications/sms/report-with-id_sms.ts)                                     | `VERIFICATION_ID` + `VERIFICATION_CODE`       |
|                     | [./src/verification/verifications/sms/report-with-identity_sms.ts](./src/verification/verifications/sms/report-with-identity_sms.ts)                         | `VERIFICATION_IDENTITY` + `VERIFICATION_CODE` |
|                     | [./src/verification/verifications/flashcall/report-with-id_flashcall.ts](./src/verification/verifications/flashcall/report-with-id_flashcall.ts)             | `VERIFICATION_ID` + `VERIFICATION_CLI`        |
|                     | [./src/verification/verifications/flashcall/report-with-identity_flashcall.ts](./src/verification/verifications/flashcall/report-with-identity_flashcall.ts) | `VERIFICATION_IDENTITY` + `VERIFICATION_CLI`  |
|                     | [./src/verification/verifications/callout/report-with-id_callout.ts](./src/verification/verifications/callout/report-with-id_callout.ts)                     | `VERIFICATION_ID` + `VERIFICATION_CODE`       |
|                     | [./src/verification/verifications/callout/report-with-identity_callout.ts](./src/verification/verifications/callout/report-with-identity_callout.ts)         | `VERIFICATION_IDENTITY` + `VERIFICATION_CODE` |
| Verification-status | [./src/verification/verification-status/verification-by-id.ts](./src/verification/verification-status/verification-by-id.ts)                                 | `VERIFICATION_ID`                             |
|                     | [./src/verification/verification-status/verification-by-identity.ts](./src/verification/verification-status/verification-by-identity.ts)                     | `VERIFICATION_IDENTITY`                       |
|                     | [./src/verification/verification-status/verification-by-reference.ts](./src/verification/verification-status/verification-by-reference.ts)                   | `VERIFICATION_REFERENCE`                      |

### Voice

| Service             | Sample application name and location                                                                                                       | Required parameters                                                                        |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Applications        | [./src/voice/applications/assignNumbers.ts](./src/voice/applications/assignNumbers.ts)                                                     | `PHONE_NUMBER` + `SINCH_APPLICATION_KEY`                                                   |
|                     | [./src/voice/applications/getCallbackURLs.ts](./src/voice/applications/getCallbackURLs.ts)                                                 | `SINCH_APPLICATION_KEY`                                                                    |
|                     | [./src/voice/applications/getNumbers.ts](./src/voice/applications/getNumbers.ts)                                                           |                                                                                            |
|                     | [./src/voice/applications/queryNumber.ts](./src/voice/applications/queryNumber.ts)                                                         | `PHONE_NUMBER`                                                                             |
|                     | [./src/voice/applications/unassignNumber.ts](./src/voice/applications/unassignNumber.ts)                                                   | `PHONE_NUMBER` + `SINCH_APPLICATION_KEY`                                                   |
|                     | [./src/voice/applications/updateCallbackURLs.ts](./src/voice/applications/updateCallbackURLs.ts)                                           | `SINCH_APPLICATION_KEY`                                                                    |
| Callouts            | [./src/voice/callouts/conference.ts](./src/voice/callouts/conference.ts)                                                                   | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER` + `CONFERENCE_ID`                                |
|                     | [./src/voice/callouts/custom.ts](./src/voice/callouts/custom.ts)                                                                           | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER` + `VOICE_CALLBACK_URL`                           |
|                     | [./src/voice/callouts/tts.ts](./src/voice/callouts/tts.ts)                                                                                 | `PHONE_NUMBER` + `RECIPIENT_PHONE_NUMBER`                                                  |
| Calls               | [./src/voice/calls/get.ts](./src/voice/calls/get.ts)                                                                                       | `CALL_ID`                                                                                  |
|                     | [./src/voice/calls/manageWithCallLeg.ts](./src/voice/calls/manageWithCallLeg.ts)                                                           | `CALL_ID`                                                                                  |
|                     | [./src/voice/calls/update.ts](./src/voice/calls/update.ts)                                                                                 | `CALL_ID`                                                                                  |
| Conferences         | [./src/voice/conferences/get.ts](./src/voice/conferences/get.ts)                                                                           | `CONFERENCE_ID`                                                                            |
|                     | [./src/voice/conferences/kickAll.ts](./src/voice/conferences/kickAll.ts)                                                                   | `CONFERENCE_ID`                                                                            |
|                     | [./src/voice/conferences/kickParticipant.ts](./src/voice/conferences/kickParticipant.ts)                                                   | `CONFERENCE_ID` + `CALL_ID`                                                                |
|                     | [./src/voice/conferences/manageParticipant.ts](./src/voice/conferences/manageParticipant.ts)                                               | `CONFERENCE_ID` + `CALL_ID`                                                                |

### Conversation

| Service      | Sample application name and location                                                                           | Required parameters                                                                        |
|--------------|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| App          | [./src/conversation/app/create.ts](./src/conversation/app/create.ts)                                           | `MESSENGER_TOKEN`                                                                          |
|              | [./src/conversation/app/delete.ts](./src/conversation/app/delete.ts)                                           | `CONVERSATION_APP_ID`                                                                      |
|              | [./src/conversation/app/get.ts](./src/conversation/app/get.ts)                                                 | `CONVERSATION_APP_ID`                                                                      |
|              | [./src/conversation/app/list.ts](./src/conversation/app/list.ts)                                               |                                                                                            |
|              | [./src/conversation/app/update.ts](./src/conversation/app/update.ts)                                           | `CONVERSATION_APP_ID`                                                                      |
| Capability   | [./src/conversation/capability/lookup.ts](./src/conversation/capability/lookup.ts)                             | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
| Contact      | [./src/conversation/contact/create.ts](./src/conversation/contact/create.ts)                                   | `CONVERSATION_APP_ID` + `MESSENGER_USER_ID` + `PHONE_NUMBER`                               |
|              | [./src/conversation/contact/delete.ts](./src/conversation/contact/delete.ts)                                   | `CONVERSATION_CONTACT_ID`                                                                  |
|              | [./src/conversation/contact/get.ts](./src/conversation/contact/get.ts)                                         | `CONVERSATION_CONTACT_ID`                                                                  |
|              | [./src/conversation/contact/getChannelProfile.ts](./src/conversation/contact/getChannelProfile.ts)             | `CONVERSATION_CONTACT_ID` + `MESSENGER_USER_ID`                                            |
|              | [./src/conversation/contact/list.ts](./src/conversation/contact/list.ts)                                       |                                                                                            |
|              | [./src/conversation/contact/merge.ts](./src/conversation/contact/merge.ts)                                     | `PHONE_NUMBER`                                                                             |
|              | [./src/conversation/contact/update.ts](./src/conversation/contact/update.ts)                                   | `CONVERSATION_CONTACT_ID`                                                                  |
| Conversation | [./src/conversation/conversation/create.ts](./src/conversation/conversation/create.ts)                         | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/conversation/delete.ts](./src/conversation/conversation/delete.ts)                         | `CONVERSATION_ID`                                                                          |
|              | [./src/conversation/conversation/get.ts](./src/conversation/conversation/get.ts)                               | `CONVERSATION_ID`                                                                          |
|              | [./src/conversation/conversation/injectEvent.ts](./src/conversation/conversation/injectEvent.ts)               | `CONVERSATION_ID` + `CONVERSATION_CONTACT_ID`                                              |
|              | [./src/conversation/conversation/injectMessage.ts](./src/conversation/conversation/injectMessage.ts)           | `CONVERSATION_ID` + `MESSENGER_USER_ID`+ `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID` |
|              | [./src/conversation/conversation/list.ts](./src/conversation/conversation/list.ts)                             | `CONVERSATION_APP_ID`                                                                      |
|              | [./src/conversation/conversation/listRecent.ts](./src/conversation/conversation/listRecent.ts)                 | `CONVERSATION_APP_ID`                                                                      |
|              | [./src/conversation/conversation/stop.ts](./src/conversation/conversation/stop.ts)                             | `CONVERSATION_ID`                                                                          |
|              | [./src/conversation/conversation/update.ts](./src/conversation/conversation/update.ts)                         | `CONVERSATION_ID`                                                                          |
| Events       | [./src/conversation/events/sendComposingEvent.ts](./src/conversation/events/sendComposingEvent.ts)             | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/events/sendComposingEndEvent.ts](./src/conversation/events/sendComposingEndEvent.ts)       | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/events/sendCommentReplyEvent.ts](./src/conversation/events/sendCommentReplyEvent.ts)       | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/events/sendAgentJoinedEvent.ts](./src/conversation/events/sendAgentJoinedEvent.ts)         | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/events/sendAgentLeftEvent.ts](./src/conversation/events/sendAgentLeftEvent.ts)             | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/events/sendGenericEvent.ts](./src/conversation/events/sendGenericEvent.ts)                 | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/events/get.ts](./src/conversation/events/get.ts)                                           | `EVENT_ID`                                                                                 |
|              | [./src/conversation/events/list.ts](./src/conversation/events/list.ts)                                         | `CONVERSATION_ID` + `CONVERSATION_CONTACT_ID`                                              |
|              | [./src/conversation/events/delete.ts](./src/conversation/events/delete.ts)                                     | `EVENT_ID`                                                                                 |
| Messages     | [./src/conversation/messages/delete.ts](./src/conversation/messages/delete.ts)                                 | `MESSAGE_ID`                                                                               |
|              | [./src/conversation/messages/get.ts](./src/conversation/messages/get.ts)                                       | `MESSAGE_ID`                                                                               |
|              | [./src/conversation/messages/list.ts](./src/conversation/messages/list.ts)                                     | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID` + `CONVERSATION_ID`                      |
|              | [./src/conversation/messages/send.ts](./src/conversation/messages/send.ts)                                     | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/send.ts](./src/conversation/messages/send.ts)                                     | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendCardMessage.ts](./src/conversation/messages/sendCardMessage.ts)               | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendCarouselMessage.ts](./src/conversation/messages/sendCarouselMessage.ts)       | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendChoiceMessage.ts](./src/conversation/messages/sendChoiceMessage.ts)           | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendContactInfoMessage.ts](./src/conversation/messages/sendContactInfoMessage.ts) | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendListMessage.ts](./src/conversation/messages/sendListMessage.ts)               | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendLocationMessage.ts](./src/conversation/messages/sendLocationMessage.ts)       | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendMediaMessage.ts](./src/conversation/messages/sendMediaMessage.ts)             | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendTemplateMessage.ts](./src/conversation/messages/sendTemplateMessage.ts)       | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/sendTextMessage.ts](./src/conversation/messages/sendTextMessage.ts)               | `CONVERSATION_APP_ID` + `CONVERSATION_CONTACT_ID`                                          |
|              | [./src/conversation/messages/update.ts](./src/conversation/messages/update.ts)                                 | `MESSAGE_ID`                                                                               |
| TemplatesV1  | [./src/conversation/templates-v1/create.ts](./src/conversation/templates-v1/create.ts)                         |                                                                                            |
|              | [./src/conversation/templates-v1/delete.ts](./src/conversation/templates-v1/delete.ts)                         | `TEMPLATE_ID`                                                                              |
|              | [./src/conversation/templates-v1/get.ts](./src/conversation/templates-v1/get.ts)                               | `TEMPLATE_ID`                                                                              |
|              | [./src/conversation/templates-v1/list.ts](./src/conversation/templates-v1/list.ts)                             |                                                                                            |
|              | [./src/conversation/templates-v1/update.ts](./src/conversation/templates-v1/update.ts)                         | `TEMPLATE_ID`                                                                              |
| TemplatesV2  | [./src/conversation/templates-v2/create.ts](./src/conversation/templates-v2/create.ts)                         |                                                                                            |
|              | [./src/conversation/templates-v2/delete.ts](./src/conversation/templates-v2/delete.ts)                         | `TEMPLATE_ID`                                                                              |
|              | [./src/conversation/templates-v2/get.ts](./src/conversation/templates-v2/get.ts)                               | `TEMPLATE_ID`                                                                              |
|              | [./src/conversation/templates-v2/list.ts](./src/conversation/templates-v2/list.ts)                             |                                                                                            |
|              | [./src/conversation/templates-v2/list-translations.ts](./src/conversation/templates-v2/list-translations.ts)   | `TEMPLATE_ID`                                                                              |
|              | [./src/conversation/templates-v2/update.ts](./src/conversation/templates-v2/update.ts)                         | `TEMPLATE_ID`                                                                              |
| Transcoding  | [./src/conversation/transcoding/transcode.ts](./src/conversation/transcoding/transcode.ts)                     | `CONVERSATION_APP_ID`                                                                      |
| Webhooks     | [./src/conversation/webhooks/create.ts](./src/conversation/webhooks/create.ts)                                 | `CONVERSATION_APP_ID` + `WEBHOOK_TARGET`                                                   |
|              | [./src/conversation/webhooks/delete.ts](./src/conversation/webhooks/delete.ts)                                 | `WEBHOOK_ID`                                                                               |
|              | [./src/conversation/webhooks/get.ts](./src/conversation/webhooks/get.ts)                                       | `WEBHOOK_ID`                                                                               |
|              | [./src/conversation/webhooks/list.ts](./src/conversation/webhooks/list.ts)                                     | `CONVERSATION_APP_ID`                                                                      |
|              | [./src/conversation/webhooks/update.ts](./src/conversation/webhooks/update.ts)                                 | `CONVERSATION_APP_ID` + `WEBHOOK_ID`                                                       |

### Fax

| Service  | Sample application name and location                                                     | Required parameters                 |
|----------|------------------------------------------------------------------------------------------|-------------------------------------|
| Services | [./src/fax/services/create.ts](./src/fax/services/create.ts)                             | `PHONE_NUMBER`                      |
|          | [./src/fax/services/get.ts](./src/fax/services/get.ts)                                   | `FAX_SERVICE_ID`                    |
|          | [./src/fax/services/list.ts](./src/fax/services/list.ts)                                 |                                     |
|          | [./src/fax/services/listNumbers.ts](./src/fax/services/listNumbers.ts)                   | `FAX_SERVICE_ID`                    |
|          | [./src/fax/services/listEmailsForNumber.ts](./src/fax/services/listEmailsForNumber.ts)   | `PHONE_NUMBER` + `FAX_SERVICE_ID`   |
|          | [./src/fax/services/update.ts](./src/fax/services/update.ts)                             | `FAX_SERVICE_ID`                    |
|          | [./src/fax/services/delete.ts](./src/fax/services/delete.ts)                             | `FAX_SERVICE_ID`                    |
| Faxes    | [./src/fax/faxes/send-filePaths.ts](./src/fax/faxes/send-filePaths.ts)                   | `PHONE_NUMBER` + `FAX_CALLBACK_URL` |
|          | [./src/fax/faxes/send-fileBase64.ts](./src/fax/faxes/send-fileBase64.ts)                 | `PHONE_NUMBER` + `FAX_CALLBACK_URL` |
|          | [./src/fax/faxes/send-multipleRecipients.ts](./src/fax/faxes/send-multipleRecipients.ts) | `PHONE_NUMBER` + `FAX_CALLBACK_URL` |
|          | [./src/fax/faxes/get.ts](./src/fax/faxes/get.ts)                                         | `FAX_ID`                            |
|          | [./src/fax/faxes/list.ts](./src/fax/faxes/list.ts)                                       |                                     |
|          | [./src/fax/faxes/downloadContent.ts](./src/fax/faxes/downloadContent.ts)                 | `FAX_ID`                            |
|          | [./src/fax/faxes/deleteContent.ts](./src/fax/faxes/deleteContent.ts)                     | `FAX_ID`                            |
| Emails   | [./src/fax/emails/add.ts](./src/fax/emails/add.ts)                                       | `FAX_EMAIL` + `PHONE_NUMBER`        |
|          | [./src/fax/emails/list.ts](./src/fax/emails/list.ts)                                     |                                     |
|          | [./src/fax/emails/listNumbers.ts](./src/fax/emails/listNumbers.ts)                       | `FAX_EMAIL`                         |
|          | [./src/fax/emails/update.ts](./src/fax/emails/update.ts)                                 | `FAX_EMAIL` + `PHONE_NUMBER`        |
|          | [./src/fax/emails/delete.ts](./src/fax/emails/delete.ts)                                 | `FAX_EMAIL`                         |

### Elastic SIP Trunk

| Service             | Sample application name and location                                                                                                   | Required parameters           |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| SIP Trunks          | [./src/elastic-sip-trunking/sip-trunks/create.ts](./src/elastic-sip-trunking/sip-trunks/create.ts)                                     |                               |
|                     | [./src/elastic-sip-trunking/sip-trunks/get.ts](./src/elastic-sip-trunking/sip-trunks/get.ts)                                           | SIP_TRUNK_ID                  |
|                     | [./src/elastic-sip-trunking/sip-trunks/list.ts](./src/elastic-sip-trunking/sip-trunks/list.ts)                                         |                               |
|                     | [./src/elastic-sip-trunking/sip-trunks/update.ts](./src/elastic-sip-trunking/sip-trunks/update.ts)                                     | SIP_TRUNK_ID                  |
|                     | [./src/elastic-sip-trunking/sip-trunks/delete.ts](./src/elastic-sip-trunking/sip-trunks/delete.ts)                                     | SIP_TRUNK_ID                  |
|                     | [./src/elastic-sip-trunking/sip-trunks/addACL.ts](./src/elastic-sip-trunking/sip-trunks/addACL.ts)                                     | SIP_TRUNK_ID, ACL_ID          |
|                     | [./src/elastic-sip-trunking/sip-trunks/listACLs.ts](./src/elastic-sip-trunking/sip-trunks/listACLs.ts)                                 | SIP_TRUNK_ID                  |
|                     | [./src/elastic-sip-trunking/sip-trunks/deleteACL.ts](./src/elastic-sip-trunking/sip-trunks/deleteACL.ts)                               | SIP_TRUNK_ID, ACL_ID          |
| SIP Endpoints       | [./src/elastic-sip-trunking/sip-endpoints/create.ts](./src/elastic-sip-trunking/sip-endpoints/create.ts)                               |                               |
|                     | [./src/elastic-sip-trunking/sip-endpoints/get.ts](./src/elastic-sip-trunking/sip-endpoints/get.ts)                                     | SIP_TRUNK_ID, SIP_ENDPOINT_ID |
|                     | [./src/elastic-sip-trunking/sip-endpoints/list.ts](./src/elastic-sip-trunking/sip-endpoints/list.ts)                                   |                               |
|                     | [./src/elastic-sip-trunking/sip-endpoints/update.ts](./src/elastic-sip-trunking/sip-endpoints/update.ts)                               | SIP_TRUNK_ID, SIP_ENDPOINT_ID |
|                     | [./src/elastic-sip-trunking/sip-endpoints/delete.ts](./src/elastic-sip-trunking/sip-endpoints/delete.ts)                               | SIP_TRUNK_ID, SIP_ENDPOINT_ID |
| Access Control List | [./src/elastic-sip-trunking/access-control-list/create.ts](./src/elastic-sip-trunking/access-control-list/create.ts)                   |                               |
|                     | [./src/elastic-sip-trunking/access-control-list/list.ts](./src/elastic-sip-trunking/access-control-list/list.ts)                       |                               |
|                     | [./src/elastic-sip-trunking/access-control-list/update.ts](./src/elastic-sip-trunking/access-control-list/update.ts)                   | ACL_ID                        |
|                     | [./src/elastic-sip-trunking/access-control-list/delete.ts](./src/elastic-sip-trunking/access-control-list/delete.ts)                   | ACL_ID                        |
|                     | [./src/elastic-sip-trunking/access-control-list/addIpRange.ts](./src/elastic-sip-trunking/access-control-list/addIpRange.ts)           | ACL_ID                        |
|                     | [./src/elastic-sip-trunking/access-control-list/listIpRanges.ts](./src/elastic-sip-trunking/access-control-list/listIpRanges.ts)       | ACL_ID                        |
|                     | [./src/elastic-sip-trunking/access-control-list/updateIpRange.ts](./src/elastic-sip-trunking/access-control-list/updateIpRange.ts)     | ACL_ID, IP_RANGE_ID           |
|                     | [./src/elastic-sip-trunking/access-control-list/deleteIpRange.ts](./src/elastic-sip-trunking/access-control-list/deleteIpRange.ts)     | ACL_ID, IP_RANGE_ID           |
|                     | [./src/elastic-sip-trunking/access-control-list/addToTrunk.ts](./src/elastic-sip-trunking/access-control-list/addToTrunk.ts)           | SIP_TRUNK_ID, ACL_ID          |
|                     | [./src/elastic-sip-trunking/access-control-list/listForTrunk.ts](./src/elastic-sip-trunking/access-control-list/listForTrunk.ts)       | SIP_TRUNK_ID                  |
|                     | [./src/elastic-sip-trunking/access-control-list/deleteFromTrunk.ts](./src/elastic-sip-trunking/access-control-list/deleteFromTrunk.ts) | SIP_TRUNK_ID, ACL_ID          |
| Country Permissions | [./src/elastic-sip-trunking/country-permissions/get.ts](./src/elastic-sip-trunking/country-permissions/get.ts)                         |                               |
|                     | [./src/elastic-sip-trunking/country-permissions/list.ts](./src/elastic-sip-trunking/country-permissions/list.ts)                       |                               |
|                     | [./src/elastic-sip-trunking/country-permissions/update.ts](./src/elastic-sip-trunking/country-permissions/update.ts)                   |                               |
| Calls               | [./src/elastic-sip-trunking/calls-history/find.ts](./src/elastic-sip-trunking/calls-history/find.ts)                                   | SIP_TRUNK_ID                  |
