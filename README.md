<h1 align="center">

   [![Sinch Logo](https://developers.sinch.com/static/logo-07afe977d6d9dcd21b066d1612978e5c.svg)](https://www.sinch.com)

   Node.js SDK

   ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sinch/sinch-sdk-node/run_tests.yaml?branch=main)
   [![Node.js LTS](https://img.shields.io/badge/Node.js-LTS%20supported-brightgreen)](https://nodejs.org/en/download/)
   ![Latest Release](https://img.shields.io/npm/v/@sinch/sdk-core?label=%40sinch%2Fsdk-core&labelColor=FFC658)
   [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://github.com/sinch/sinch-sdk-node/blob/main/LICENSE)

</h1>

## Welcome to Sinch's Node.js SDK.

Here you'll find documentation to start developing Node.js code using Sinch services. 

To use this SDK you'll need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

Once logged-in you'll find different sets of credentials to access to the various Sinch APIs:
 - On the [Account dashboard](https://dashboard.sinch.com/account/access-keys), you will find your `projectId` and access keys composed of pairs of `keyId` / `keySecret`. Unless mentionned otherwise, these are the credentials you will need to access most of the Sinch APIs
  - For the **Verification** and **Voice** APIs, you will find pairs of `App key` / `App secret` in the [Verification dashboard](https://dashboard.sinch.com/verification/apps) and the [Voice dashboard](https://dashboard.sinch.com/voice/apps) respectively. Note that the apps are the same, wherever you access them.
  - For the **SMS** API, the standard credentials (`projectId`, `keyId`, `keySecret`) are available only in the US and EU regions. If your business involves any of the other regions (BR, CA, AU), you will need to use your `servicePlanId` that you can find on the [Service APIs dashboard](https://dashboard.sinch.com/sms/api/services). Note that the `servicePlanId` supports all the regions (US, EU, BR, CA, AU).

For more in depth information about the Sinch APIs, please refer to the official developer portal - [developers.sinch.com](https://developers.sinch.com/)

<span style="color:red; font-weight:bold">Warning:</span>
**This SDK is currently available for preview purposes only. It should not be used in production environments.**

## Installation

### With NPM

```bash
npm install @sinch/sdk-core
```

### With Yarn

```bash
yarn add @sinch/sdk-core
```

## Constructor

```typescript
import {
  SinchClient,
} from '@sinch/sdk-core';

const sinchClient = new SinchClient(sinchClientParameters);
```
where `sinchClientParameters` is an object containing the properties required to access the API you want to use:
 - for **Verification** and **Voice** APIs:
   - `applicationKey`
   - `applicationSecret`
 - for **SMS** API when using the AU, BR or CA region (works also for US and EU)
   - `servicePlanId`
   - `apiToken`
 - for all the other APIs (including SMS is using the US and EU regions only)
   - `projectId`
   - `keyId`
   - `keySecret`

## Promises
All the methods that interact with the Sinch APIs use Promises.
```typescript
const response: SendSMSResponse = await sinchClient.sms.batches.send({
   SendSMSRequest: {
      to: [
         '+12223334444',
         '+12223335555'
      ],
      from: '+12228889999',
      parameters: {
         name: {
            '+12223334444': 'John',
            default: 'there',
         }
      },
      body: 'Hi ${name}',
      type: 'mt_text',
   },
});
console.log(`The SMS has been sent successfully. Here is the batch id: ${response.id}`)
```

## Examples
You can find an example of each request in the [examples/simple-examples](./examples/simple-examples/) folder.

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)

## Supported APIs

Here is the list of the Sinch API and there level of support by the Node.js SDK:

| API Category           | API Name                            | Status |
|------------------------|-------------------------------------|:------:|
| Messaging              | SMS API                             |   ✅    |
|                        | Conversation API                    |   ❌    |
|                        | RCS API                             |   ❌    |
|                        | MMS API                             |   ❌    |
|                        | Provisioning API                    |   ❌    |
| Voice and Video        | Voice API                           |   ❌    |
|                        | Elastic SIP Trunking                |   ❌    |
| Numbers & Connectivity | Numbers API                         |   ✅    |
|                        | Brand and Campaign Registration API |   ❌    |
|                        | Number Lookup API                   |   ❌    |
| Verification           | Verification API                    |   ✅    |
