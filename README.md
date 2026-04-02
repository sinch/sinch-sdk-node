# Sinch Node.js SDK

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sinch/sinch-sdk-node/run-ci.yaml?branch=main)
[![Node.js LTS](https://img.shields.io/badge/Node.js-LTS%20supported-brightgreen)](https://nodejs.org/en/download/)
[![Latest Release](https://img.shields.io/npm/v/@sinch/sdk-core?label=%40sinch%2Fsdk-core&labelColor=FFC658)](https://www.npmjs.com/package/@sinch/sdk-core)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://github.com/sinch/sinch-sdk-node/blob/main/LICENSE)

Here you'll find documentation related to the Sinch Node.js SDK, including how to install it, initialize it, and start developing Node.js code using Sinch services.

To use Sinch services, you'll need a Sinch account and access keys. You can sign up for an account and create access keys at [dashboard.sinch.com](https://dashboard.sinch.com).

Once logged in you'll find different sets of credentials to access the various Sinch APIs:
 - On the [Account dashboard](https://dashboard.sinch.com/account/access-keys), you will find your `projectId` and access keys composed of pairs of `keyId` / `keySecret`. Unless mentioned otherwise, these are the credentials you will need to access most of the Sinch APIs
  - For the **Verification** and **Voice** APIs, you will find pairs of `App key` / `App secret` in the [Verification dashboard](https://dashboard.sinch.com/verification/apps) and the [Voice dashboard](https://dashboard.sinch.com/voice/apps) respectively. Note that the apps are the same, regardless of where you access them.
  - For the **SMS** API, the standard credentials (`projectId`, `keyId`, `keySecret`) are available only in the US and EU regions. If your business involves any of the other regions (BR, CA, AU), you will need to use your `servicePlanId`, which you can find on the [Service APIs dashboard](https://dashboard.sinch.com/sms/api/services). Note that the `servicePlanId` supports all regions (US, EU, BR, CA, AU).
  - The **Conversation** API uses the standard credentials (`projectId`, `keyId`, `keySecret`) and is available in the US, EU and BR regions.

For more information on the Sinch APIs on which this SDK is based, refer to the official [developer documentation portal](developers.sinch.com).

## Prerequisites

Before being able to execute the commands described below, you will need to install Node.js. We recommend [installing the current or the LTS version](https://nodejs.org/en).

NPM will come with the Node.js installation. If you want to use `yarn` as a package manager, you'll need to install it separately with the following command:
```bash
npm install --global yarn
```

> **Warning**:
> Do not use this Node.js library in front-end applications (such as Angular, React, Vue.js, etc.). Doing so can expose your Sinch credentials to end-users as part of the HTML/JavaScript files loaded on their browser.

### Node.js supported versions

The Sinch Node.js SDK follows the [Node.js release cycle](https://nodejs.org/en/about/previous-releases). 

This means that Node.js version 18 will be supported until May 2025. However, we recommend using the active LTS or the current Node.js version.

## Installation

### With NPM

```bash
# Create a new folder (For Windows Command Prompt or PowerShell users, replace 'mkdir' by 'md')
mkdir my-sinch-app
# Move to the new folder
cd my-sinch-app
# Init the project (provide information about your project, such as package name, version, description, ...)
npm init
# Install the Sinch Node.js SDK dependency
npm install @sinch/sdk-core
```

### With Yarn

```bash
# Create a new folder (For Windows Command Prompt or PowerShell users, replace 'mkdir' by 'md')
mkdir my-sinch-app
# Move to the new folder
cd my-sinch-app
# Init the project (provide information about your project, such as package name, version, description, ...)
yarn init
# Install the Sinch Node.js SDK dependency
yarn add @sinch/sdk-core
```

## SDK usage

### Constructor

To initialize communication with the Sinch servers, credentials obtained from the Sinch dashboard must be provided to the main client class of this SDK. It's highly recommended to not hardcode these credentials and to load them from environment variables instead.

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
   - (For the Voice API, `voiceRegion` is optional. Default is empty).
 - for **SMS** API when using the AU, BR or CA region (works also for US and EU)
   - `servicePlanId`
   - `apiToken`
   - (`region` is optional. Default is `US`).
 - for all the other APIs (including SMS when using the US and EU regions only)
   - `projectId`
   - `keyId`
   - `keySecret`
   - (For the SMS API, `region` is optional. Default is `US`).

From this client, you have access to all the SDK services that support the Sinch APIs:
```typescript
import {
  SinchClient,
} from '@sinch/sdk-core';

const sinch = new SinchClient(sinchClientParameters);
const conversationService = sinch.conversation;
const elasticSipTrunkingService = sinch.elasticSipTrunking;
const faxService = sinch.fax;
const numbersService = sinch.numbers;
const numberLookupService = sinch.numberLookup;
const smsService = sinch.sms;
const verificationService = sinch.verification;
const voiceService = sinch.voice;
```

### Promises

All the methods that interact with the Sinch APIs use Promises.

```typescript
const response: SendSMSResponse = await conversationService.messages.sendTextMessage({
   sendMessageRequestBody: {
      app_id: appId,
      recipient: {
         identified_by: {
            channel_identities: [
               {
                  channel: 'RCS',
                  identity: '+33612345678',
               },
            ],
         },
      },
      message: {
         text_message: {
            text: 'Hi from Sinch SDK!',
         },
      },
   },
});

console.log(`The RCS message has been sent successfully. Here is the message id: ${response.message_id}`)
```

## Supported APIs

Here is the list of the Sinch products and their level of support by the Node.js SDK:

| API Category           | API Name                 | Status |
|------------------------|--------------------------|:------:|
| Messaging              | SMS API                  |   ✅    |
|                        | Conversation API         |   ✅    |
|                        | Fax API                  |   ✅    |
| Voice and Video        | Voice API                |   ✅    |
|                        | Elastic SIP Trunking API |   ✅    |
| Numbers & Connectivity | Numbers API              |   ✅    |
| Verification           | Verification API         |   ✅    |
|                        | Number Lookup API        |   ✅    |

### Packages

The Sinch Node.js SDK is packaged in the following way:
 - [`@sinch/sdk-core`](./packages/sdk-core): package defining the `SinchClient` class and wrapping all the other packages.
 - [`@sinch/conversation`](./packages/conversation): package that contains Conversation services: App, Capability, Consents, Contact, Conversation, Events, Messages, Project Settings, Templates V1 (deprecated) and V2, Transcoding, Webhooks management and Webhooks callbacks.
 - [`@sinch/elastic-sip-trunking`](./packages/elastic-sip-trunking): package that contains the Elastic SIP Trunking services: SIP Trunks, Access Control List, SIP Endpoints, Credential Lists, Projects, Country Permissions, Call Blocking Rules, and Calls History.
 - [`@sinch/fax`](./packages/fax): package that contains the Fax services: Services, Faxes, Faxes-on-emails and Cover Pages.
 - [`@sinch/number-lookup`](./packages/number-lookup): package that contains the Number Lookup service: Lookup a phone number.
 - [`@sinch/numbers`](./packages/numbers): package that contains the Numbers services: Available number, Active number, Available regions, Callbacks management and Webhooks callbacks.
 - [`@sinch/sms`](./packages/sms): package that contains SMS services: Batches, Delivery reports, Inbounds, Groups and Webhooks callbacks.
 - [`@sinch/verification`](./packages/verification): package that contains the Verification services: Verification start and report, Verification status and Webhooks callbacks.
 - [`@sinch/voice`](./packages/voice): package that contains the Voice services: Callouts, Calls, Conferences, Applications management and Webhooks callbacks.
 - [`@sinch/sdk-client`](./packages/sdk-client): package included by all the other ones that contains the API client classes and helpers.

## Examples

You can find:
 - a TS example of each request in the [examples/simple-examples](./examples/simple-examples) folder.
 - a JS example of each request in the [examples/snippets](./examples/snippets) folder.
 - getting started guides for specific use cases in the [examples/getting-started](./examples/getting-started) folder.
 - examples of integrated flows in the [examples/integrated-flows-examples](./examples/integrated-flows-examples) folder.

## Contact

Developer Experience engineering team: [team-developer-experience@sinch.com](mailto:team-developer-experience@sinch.com)
