# Sinch Node.js SDK


[![Node.js](https://img.shields.io/badge/python-blue.svg)]
[![Latest Release](https://img.shields.io/npm/v/@sinch/sdk-core?label=%40sinch%2Fsdk-core&labelColor=FFC658)](https://www.npmjs.com/package/@sinch/sdk-core)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://github.com/sinch/sinch-sdk-node/blob/main/LICENSE)


Here you'll find documentation related to the Sinch Node SDK, including how to install it, initialize it, and start developing Node code using Sinch services.

To use Sinch services, you'll need a Sinch account and access keys. You can sign up for an account and create access keys at [dashboard.sinch.com](https://dashboard.sinch.com).

For more information on the SDK, refer to the dedicated [Node SDK documentation section](https://developers.sinch.com/docs/sdks/node) and for the Sinch APIs on which this SDK is based, refer to the official [developer documentation portal](https://developers.sinch.com).

## Table of contents:

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Supported APIs](#supported-apis)
- [Getting started](#getting-started)
- [Handling exceptions](#handling-exceptions)
- [Third-party dependencies](#third-party-dependencies)
- [Examples](#examples)
- [Changelog](#changelog)
- [License](#license)
- [Contact](#contact)

## Prerequisites

- Node.js 18 or later (LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (recommended)
- [Sinch account](https://dashboard.sinch.com/)

> **Warning**:
> This SDK is intended for server-side (backend) use only. Do not use it in front-end or client-side applications (web, mobile, or desktop), regardless of language or framework. Doing so can expose your Sinch credentials to end-users.

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

## Supported APIs

| API Category    | API Name |
|-----------------|----------|
| Messaging       | [Conversation API](https://developers.sinch.com/docs/conversation) |
| Messaging       | [SMS API](https://developers.sinch.com/docs/sms) |
| Voice and Video | [Voice API](https://developers.sinch.com/docs/voice) |
| Voice and Video | [Elastic SIP Trunking API](https://developers.sinch.com/docs/est) |
| Numbers         | [Numbers API](https://developers.sinch.com/docs/numbers) |
| Verification    | [Verification API](https://developers.sinch.com/docs/verification) |
| Verification    | [Number Lookup API](https://developers.sinch.com/docs/number-lookup-api-v2) |
| Fax             | [Fax API](https://developers.sinch.com/docs/fax) |

## Getting started

The SDK is split across npm packages. Import `SinchClient` from [`@sinch/sdk-core`](./packages/sdk-core), which bundles all API packages. Each API lives in its own package, and all packages share the HTTP layer from [`@sinch/sdk-client`](./packages/sdk-client).

### Client initialization

To start using the SDK, initialize the main client class. This client gives you access to all the SDK services:

```typescript
import { SinchClient } from '@sinch/sdk-core';

// Warning: not all APIs support project authentication. Check the section for each API before using this snippet.
const sinch = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
});
```

Get `project_id`, `key_id` and `key_secret` from the [Access keys](https://dashboard.sinch.com/settings/access-keys) page in your Sinch dashboard (`key_secret` is shown only once, at creation time). It's highly recommended to not hardcode these credentials: load them from environment variables for local development, and from a secret manager in production.

This snippet is the common starting point for every API. Some APIs have a different initialization or need extra parameters (for example, a region), see the section for each API.

### Conversation API

The Conversation API is regionalized. To use this API, the `conversation_region` parameter is required:

```typescript
import { SinchClient } from '@sinch/sdk-core';

const sinch = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
  conversationRegion: 'us',
});
```

#### Callbacks

The Conversation API delivers asynchronous callbacks to the webhook URL you configure for your app in the [Conversation dashboard](https://dashboard.sinch.com/convapi/apps). `validateAuthenticationHeader` confirms a request comes from Sinch and `parseEvent` turns its payload into a typed callback object; `headers` and `rawBody` are the incoming request's headers and raw body:

```typescript
import { ConversationCallbackWebhooks } from '@sinch/sdk-core';

const callbackWebhooks = new ConversationCallbackWebhooks(process.env.SINCH_CONVERSATION_APP_SECRET);

const validated = callbackWebhooks.validateAuthenticationHeader(request.headers, request.rawBody);
if (!validated) {
  return res.status(401).send('Invalid webhook signature');
}

const event = callbackWebhooks.parseEvent(request.body);
```

`SINCH_CONVERSATION_APP_SECRET` is the app secret set per app in the [Conversation dashboard](https://dashboard.sinch.com/convapi/apps). `parseEvent` works without validating the request, but then its origin can't be verified, so validating is recommended in production.

You can find a complete example in [examples/webhooks](./examples/webhooks).

### SMS API

> **Warning:** the SMS API is end-of-sale. For new integrations, prefer the [Conversation API](#conversation-api).

The SMS API is regionalized: set `sms_region` to the region where your SMS account is hosted. The accepted values are `us`, `eu`, `au`, `br` and `ca`, and the region also determines which credentials you can use:

- **Project access keys** — available only in the `us` and `eu` regions. Use the same `project_id`, `key_id` and `key_secret` as the common client, plus `sms_region`:

```typescript
import { SinchClient } from '@sinch/sdk-core';

const sinch = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_KEY_ID,
  keySecret: process.env.SINCH_KEY_SECRET,
  smsRegion: 'us',
});
```

> **SMS authentication for new projects**
>
> Projects created after the SMS API end-of-sale (`15/04/26`) cannot use project access keys — the SMS API requests return `401 Unauthorized`.
>
> If you encounter this issue, consider the following options:
>
> 1. Use service plan credentials (`service_plan_id` + `sms_api_token`)
> 2. Use the Conversation API, which works with project access keys.
> 3. Contact your account manager

- **Service plan** — available in all regions (`us`, `eu`, `au`, `br`, `ca`). Use a `service_plan_id` and `sms_api_token`, both available on the [Service APIs dashboard](https://dashboard.sinch.com/sms/api/services):

```typescript
import { SinchClient } from '@sinch/sdk-core';

const sinch = new SinchClient({
  servicePlanId: process.env.SINCH_SERVICE_PLAN_ID,
  apiToken: process.env.SINCH_API_TOKEN,
  smsRegion: 'au',
});
```

> **Note:** if you use both the SMS and the [Conversation API](#conversation-api) from the same client, set `sms_region` and `conversation_region` to the same region. Mismatched regions cause delivery failures.

#### Callbacks

The SMS API delivers asynchronous callbacks to a webhook URL set per batch with the `callback_url` parameter on the send, update and replace operations. `validateAuthenticationHeader` confirms a request comes from Sinch and `parseEvent` turns its payload into a typed callback object; `headers` and `rawBody` are the incoming request's headers and raw body:

```typescript
import { SmsCallbackWebhooks } from '@sinch/sdk-core';

const callbackWebhooks = new SmsCallbackWebhooks(process.env.SINCH_SMS_APP_SECRET);

const validated = callbackWebhooks.validateAuthenticationHeader(request.headers, request.rawBody);
if (!validated) {
  return res.status(401).send('Invalid webhook signature');
}

const event = callbackWebhooks.parseEvent(request.body);
```

Signature authentication for SMS callbacks must be enabled for your account by your account manager. Until it is activated, signature headers will not be present and `parseEvent` can be called directly without signature validation. See the [SMS callbacks documentation](https://developers.sinch.com/docs/sms/api-reference/sms/tag/Webhooks/#tag/Webhooks/section/Callbacks).

You can find a complete example in [examples/webhooks](./examples/webhooks).

### Voice API

The Voice API does not use project access keys. It authenticates with an `application_key` and `application_secret`, which you create per application in the [Voice dashboard](https://dashboard.sinch.com/voice/apps). Optionally set `voice_region` to select the regional endpoint:

```typescript
import { SinchClient } from '@sinch/sdk-core';

const sinch = new SinchClient({
  applicationKey: process.env.SINCH_APPLICATION_KEY,
  applicationSecret: process.env.SINCH_APPLICATION_SECRET,
  voiceRegion: 'euc1',
});
```

#### Callbacks

The Voice API delivers asynchronous callbacks to the callback URL you configure for your application in the [Voice dashboard](https://dashboard.sinch.com/voice/apps). `validateAuthenticationHeader` confirms a request comes from Sinch and `parseEvent` turns its payload into a typed callback object; `headers`, `rawBody`, `path` and `method` are the incoming request's headers, raw body, path and HTTP method:

```typescript
import { VoiceCallbackWebhooks } from '@sinch/sdk-core';

const callbackWebhooks = new VoiceCallbackWebhooks({
  applicationKey: process.env.SINCH_APPLICATION_KEY,
  applicationSecret: process.env.SINCH_APPLICATION_SECRET,
});

const validated = callbackWebhooks.validateAuthenticationHeader(
  request.headers,
  request.rawBody,
  request.path,
  request.method,
);
if (!validated) {
  return res.status(401).send('Invalid authorization');
}

const event = callbackWebhooks.parseEvent(request.body);
```

You can find a complete example in [examples/webhooks](./examples/webhooks).

### Verification API

The Verification API uses the same application credentials as the Voice API. Create an application in the [Verification dashboard](https://dashboard.sinch.com/verification/apps):

```typescript
import { SinchClient } from '@sinch/sdk-core';

const sinch = new SinchClient({
  applicationKey: process.env.SINCH_APPLICATION_KEY,
  applicationSecret: process.env.SINCH_APPLICATION_SECRET,
});
```

#### Callbacks

The Verification API delivers asynchronous callbacks to the callback URL you configure for your application in the [Verification dashboard](https://dashboard.sinch.com/verification/apps). `validateAuthenticationHeader` confirms a request comes from Sinch and `parseEvent` turns its payload into a typed callback object; `headers`, `rawBody`, `path` and `method` are the incoming request's headers, raw body, path and HTTP method:

```typescript
import { VerificationCallbackWebhooks } from '@sinch/sdk-core';

const callbackWebhooks = new VerificationCallbackWebhooks({
  applicationKey: process.env.SINCH_APPLICATION_KEY,
  applicationSecret: process.env.SINCH_APPLICATION_SECRET,
});

const validated = callbackWebhooks.validateAuthenticationHeader(
  request.headers,
  request.rawBody,
  request.path,
  request.method,
);
if (!validated) {
  return res.status(401).send('Invalid authorization');
}

const event = callbackWebhooks.parseEvent(request.body);
```

You can find a complete example in [examples/webhooks](./examples/webhooks).

### Elastic SIP Trunking API

The Elastic SIP Trunking API needs no extra parameters, use the [common client](#client-initialization) shown above.

### Numbers API

The Numbers API needs no extra parameters, use the [common client](#client-initialization) shown above.

#### Callbacks

The Numbers API delivers asynchronous callbacks to the callback URL you configure through `numbers.callbacks`. `validateAuthenticationHeader` confirms a request comes from Sinch and `parseEvent` turns its payload into a typed callback object; `headers` and `rawBody` are the incoming request's headers and raw body:

```typescript
import { NumbersCallbackWebhooks } from '@sinch/sdk-core';

const callbackWebhooks = new NumbersCallbackWebhooks(process.env.SINCH_NUMBERS_CALLBACK_SECRET);

const validated = callbackWebhooks.validateAuthenticationHeader(request.headers, request.rawBody);
if (!validated) {
  return res.status(401).send('Invalid signature');
}

const event = callbackWebhooks.parseEvent(request.body);
```

`SINCH_NUMBERS_CALLBACK_SECRET` is the `hmacSecret` returned by `numbers.callbacks.get()`. `parseEvent` works without validating the request, but then its origin can't be verified, so validating is recommended in production.

You can find a complete example in [examples/webhooks](./examples/webhooks).

### Number Lookup API

The Number Lookup API needs no extra parameters, use the [common client](#client-initialization) shown above.

### Fax API

The Fax API needs no extra parameters, use the [common client](#client-initialization) shown above.

#### Callbacks

The Fax API delivers asynchronous callbacks to the incoming webhook URL you configure per service in the [Fax dashboard](https://dashboard.sinch.com/fax/services). `parseEvent` turns the payload into a typed callback object:

```typescript
import { FaxCallbackWebhooks } from '@sinch/sdk-core';

const event = FaxCallbackWebhooks.parseEvent(request.body);
```

No request signature validation is implemented for the Fax API. You can find a complete example in [examples/webhooks](./examples/webhooks).

### Your first request

Once your client is configured, you can send your first message. The example below uses the Conversation API to send a simple text message over SMS. Replace CONVERSATION_APP_ID with your app ID and RECIPIENT_PHONE_NUMBER with the recipient's phone number:

```typescript
const response = await sinch.conversation.messages.send({
  sendMessageRequestBody: {
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
            channel: 'SMS',
            identity: 'RECIPIENT_PHONE_NUMBER',
          },
        ],
      },
    },
  },
});
```

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
 - a JS example of each request in the [examples/snippets](./examples/snippets) folder.
 - getting started guides for specific use cases in the [examples/getting-started](./examples/getting-started) folder.
 - a TS example of each request in the [examples/simple-examples](./examples/simple-examples) folder.
 - a Nest.js application for handling Sinch webhook callbacks in the [examples/webhooks](./examples/webhooks) folder.
 - examples of integrated flows in the [examples/integrated-flows-examples](./examples/integrated-flows-examples) folder.

## Changelog

For information about the latest changes in the SDK, please refer to the [CHANGELOG](./packages/sdk-core/CHANGELOG.md) file.

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for the license text.

## Contact

Developer Experience engineering team: [team-developer-experience@sinch.com](mailto:team-developer-experience@sinch.com)
