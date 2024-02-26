# Sinch Conversation SDK for Node.js

This package contains the Sinch Conversation SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

> <span style="color:red; font-weight:bold">Warning:</span>
> **This SDK is currently available to selected developers for preview use only. It is being provided for the purpose of collecting feedback, and should not be used in production environments.**

## Installation

We recommend to use this SDK as part of the `@sinch/sdk-core` package as it will take care about the authentication plugins to use.

However, it's still possible to use this SDK standalone is you need to access the Conversation API only.

### With NPM

```bash
npm install @sinch/conversation
```

### With Yarn

```bash
yarn add @sinch/conversation
```

## Usage

### Credentials

The `Conversation` API uses the Sinch unified authentication with OAuth2. You will need to provide the following credentials:
- projectId: can be found in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
- keyId:: can be found in your Access key list in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
- keySecret: can be found **ONLY** when generating a new access key: keep it safe!

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `conversation` property of the client that you would have instantiated.

```typescript
import {
  SinchClient,
  SinchClientParameters,
} from '@sinch/sdk-core';

const credentials: SinchClientParameters = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

const sinch = new SinchClient(credentials);

const requestData: SendMessageRequestData = {
  sendMessageRequestBody: {
    app_id: 'CONVERSATION_APP_ID',
    message: {
      text_message: {
        text: 'Text message from Sinch',
      },
    },
    recipient: {
      contact_id: 'CONTACT_ID',
    },
  },
};

// Access the 'conversation' domain registered on the Sinch Client
const result: SendMessageResponse
    = await sinch.conversation.messages.send(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Conversation APIs.

```typescript
import {
  SinchClientParameters,
} from '@sinch/sdk-client';
import {

} from '@sinch/conversation';

const credentials: SinchClientParameters = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Declare the 'conversation' service in a standalone way
const conversation = new Conversation(options);

const requestData: SendMessageRequestData = {
  sendMessageRequestBody: {
    app_id: 'CONVERSATION_APP_ID',
    message: {
      text_message: {
        text: 'Text message from Sinch',
      },
    },
    recipient: {
      contact_id: 'CONTACT_ID',
    },
  },
};

// Use the standalone declaration of the 'conversation' domain
const result: SendMessageResponse
    = await conversation.messages.send(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete
let result: SendMessageResponse;
try {
  result = await sinch.conversation.messages.send(requestData);
  console.log(`Message sent successfully. Message Id: ${result.id}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: `);
}

// Method 2: Resolve the promise
sinch.conversation.messages.send(requestData)
  .then(response => console.log(`Message sent successfully. Message Id: ${result.id}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: `));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
