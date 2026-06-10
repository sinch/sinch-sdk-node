# Sinch Node.js SDK


![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sinch/sinch-sdk-node/run-ci.yaml?branch=main)
[![Node.js LTS](https://img.shields.io/badge/Node.js-LTS%20supported-brightgreen)](https://nodejs.org/en/download/)
[![Latest Release](https://img.shields.io/npm/v/@sinch/sdk-core?label=%40sinch%2Fsdk-core&labelColor=FFC658)](https://www.npmjs.com/package/@sinch/sdk-core)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://github.com/sinch/sinch-sdk-node/blob/main/LICENSE)


Here you'll find documentation related to the Sinch Node SDK, including how to install it, initialize it, and start developing Node code using Sinch services.

To use Sinch services, you'll need a Sinch account and access keys. You can sign up for an account and create access keys at [dashboard.sinch.com](https://dashboard.sinch.com).

For more information on the SDK, refer to the dedicated [Node SDK documentation section](https://developers.sinch.com/docs/sdks/node) and for the Sinch APIs on which this SDK is based, refer to the official [developer documentation portal](https://developers.sinch.com).

## Table of contents:

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting started](#getting-started)
- [Supported APIs](#supported-apis)
- [Packages](#packages)
- [Handling exceptions](#handling-exceptions)
- [Third-party dependencies](#third-party-dependencies)
- [Examples](#examples)
- [Changelog](#changelog)
- [License](#license)
- [Contact](#contact)

## Prerequisites

- [Node.js](https://nodejs.org/en)
- NPM or yarn (recommended)
- [Sinch Account](https://dashboard.sinch.com/)

> **Warning**:
> Do not use this Node.js library in front-end applications (such as Angular, React, Vue.js, etc.). Doing so can expose your Sinch credentials to end-users as part of the HTML/JavaScript files loaded on their browser.

## Installation

Run the following command to install the SDK:
```bash
npm init
npm install @sinch/sdk-core
```

If you want to use yarn as a package manager, run:
```bash
npm install --global yarn
yarn init
yarn add @sinch/sdk-core
```

## Getting started

### Client initialization
To start using the SDK, you need to initialize the main client class with your credentials from your Sinch dashboard.
It's highly recommended to not hardcode these credentials and to load them from environment variables instead.

From this client, you have access to all the SDK services:
```typescript
import {
  SinchClient,
} from '@sinch/sdk-core';

const sinchClient = new SinchClient({
    projectId: "YOUR_project_id",
    keyId: "YOUR_access_key",
    keySecret: "YOUR_access_secret"
});
const conversationService = sinch.conversation;
const elasticSipTrunkingService = sinch.elasticSipTrunking;
const faxService = sinch.fax;
const numbersService = sinch.numbers;
const numberLookupService = sinch.numberLookup;
const smsService = sinch.sms;
const verificationService = sinch.verification;
const voiceService = sinch.voice;
```

### Authentication

#### Project-level authentication

This is the recommended, default method and the one most Sinch APIs rely on. It uses your project-level [access key](https://dashboard.sinch.com/settings/access-keys). The SDK exchanges them for a short-lived OAuth2 access token and refreshes it automatically.
```typescript
const {SinchClient} = require('@sinch/sdk-core');

const sinchClient = new SinchClient({
    projectId: "YOUR_project_id",
    keyId: "YOUR_access_key",
    keySecret: "YOUR_access_secret"
});
```

#### Voice and Verification authentication 

Voice and Verification APIs don't use project-level credentials. They authenticate with an application key and application secret, which you create per application in the [Voice dashboard](https://dashboard.sinch.com/voice/apps) or [Verification dashboard](https://dashboard.sinch.com/verification/apps). The SDK uses this pair to sign each request.

For the Voice API, `voiceRegion` is optional and selects the regional endpoint. Verification does not use a region parameter.

```typescript
const {SinchClient} = require('@sinch/sdk-core');

const sinchClient = new SinchClient({
    applicationKey: "YOUR_application_key",
    applicationSecret: "YOUR_application_secret",
    voiceRegion: "euc1", // Optional. Voice API only. Defaults to "".
});
```

#### SMS authentication

The SMS API supports two authentication schemes depending on your region:

- **OAuth2 (US and EU)** — Uses the same project-level [access keys](https://dashboard.sinch.com/settings/access-keys) as above (`projectId`, `keyId`, `keySecret`).
```typescript
const {SinchClient} = require('@sinch/sdk-core');

const sinchClient = new SinchClient({
    projectId: "YOUR_project_id",
    keyId: "YOUR_access_key",
    keySecret: "YOUR_access_secret",
    smsRegion: "us" // Optional. Use "us" or "eu". Defaults to "us".
});
```

- **Service plan (AU, BR, CA, US and EU)** — Uses a `servicePlanId` and `apiToken` from the [Service APIs dashboard](https://dashboard.sinch.com/sms/api/services).
```typescript
const {SinchClient} = require('@sinch/sdk-core');

const sinchClient = new SinchClient({
    servicePlanId: "YOUR_service_plan_id",
    apiToken: "YOUR_api_token",
    smsRegion: "au" // Optional. Use "us", "eu", "br", "au", or "ca". Defaults to "us".
});
```


> **SMS authentication for new accounts**
>
> Accounts created after the SMS API end-of-sale (`15/04/26`) cannot use
> project auth (OAuth2) for the SMS API requests return `401 Unauthorized`.
>
> If you hit this error, you have three options:
>
> 1. Use service-plan auth (`servicePlanId` + `apiToken`)
> 2. Use the Conversation API, which supports OAuth2.
> 3. Contact your account manager


### Your first request

Once your client is configured, you can send your first message. The example below uses the Conversation API to send a simple text message over RCS. Replace CONVERSATION_APP_ID with your app ID and RECIPIENT_PHONE_NUMBER with the recipient's phone number:

```typescript
  const response = await sinch.conversation.messages.send({
      sendMessageRequestBody :{
        app_id: CONVERSATION_APP_ID,
        message: {
          text_message: {
            text: '[Node.js SDK: Conversation Message] Sample text message',
          },
        },
        recipient: {
          identified_by: {
            channel_identities: [
              {
                channel: 'RCS',
                identity: 'RECIPIENT_PHONE_NUMBER',
              },
            ],
          },
        },
      },
    });
  console.log('✅ Successfully sent Message.');
  console.log(JSON.stringify(response, null, 2));
```

## Supported APIs

| API Category      | API Name               | Authentication |
|-------------------|------------------------|----------------|
| Messaging         | Conversation API       | OAuth2         |
| Messaging         | SMS                    | OAuth2, APP    |
| Voice and Video   | Voice API              | APP            |
| Voice and Video   | Elastic SIP Trunking   | OAuth2         |
| Numbers           | Numbers API            | OAuth2         |
| Verification      | Verification API       | APP            |
| Verification      | Number Lookup API      | OAuth2         |
| Fax               | Fax API                | OAuth2         |

## Packages

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

## Handling exceptions

Failed API calls throw typed errors from `@sinch/sdk-core`. The SDK validates every response automatically and raises an exception when the HTTP status is not successful or when the response body is empty or invalid.

| Error class | When it is thrown |
|-------------|-------------------|
| `RequestFailedError` | The API returned a non-success HTTP status (`statusCode` and `data` are available on the error) |
| `EmptyResponseError` | The response is missing or empty |
| `ResponseJSONParseError` | The response body could not be parsed as JSON |
| `GenericError` | Other SDK-level errors |

```typescript
try {
  await sinchClient.sms.batches.send({
  sendSMSRequestBody: {
    body: 'Hello from the Sinch Node.js SDK!',
    to: ['+12065550100'],
    from: 'YOUR_sender_number',
  },
});
} catch (error) {
  if (error instanceof RequestFailedError) {
    console.error(`Request failed (${error.statusCode}):`, error.data);
  } else {
    console.error(error);
  }
}
```

## Third-party dependencies

The SDK relies on the following third-party dependencies:
- [node-fetch](https://www.npmjs.com/package/node-fetch): HTTP client used to send API requests.
- [form-data](https://www.npmjs.com/package/form-data): Multipart form-data support for file uploads.

## Examples

You can find:
 - a TS example of each request in the [examples/simple-examples](./examples/simple-examples) folder.
 - a JS example of each request in the [examples/snippets](./examples/snippets) folder.
 - getting started guides for specific use cases in the [examples/getting-started](./examples/getting-started) folder.
 - examples of integrated flows in the [examples/integrated-flows-examples](./examples/integrated-flows-examples) folder.
 - a Nest.js application for handling Sinch webhook callbacks in the [examples/webhooks](./examples/webhooks) folder.

## Changelog

For information about the latest changes in the SDK, please refer to the [CHANGELOG](./packages/sdk-core/CHANGELOG.md) file.

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for the license text.

## Contact

Developer Experience engineering team: [team-developer-experience@sinch.com](mailto:team-developer-experience@sinch.com)
