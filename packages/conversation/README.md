# Sinch Conversation SDK for Node.js

This package contains the Sinch Conversation SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

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
  ConversationService,
  SinchClient,
  UnifiedCredentials,
  Conversation,
} from '@sinch/sdk-core';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Access the 'conversation' service registered on the Sinch Client
const sinch = new SinchClient(credentials);
const conversationService: ConversationService = sinch.conversation;

// Build the request data
const requestData: Conversation.SendMessageRequestData = {
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
    channel_priority_order: [
      'WHASAPP',
    ],
  },
};

// Use the 'conversation' service registered on the Sinch client
const result: Conversation.SendMessageResponse
    = await conversationService.messages.send(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Conversation APIs.

```typescript
import {
  UnifiedCredentials,
} from '@sinch/sdk-client';
import {
  ConversationService,
  Conversation,
} from '@sinch/conversation';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Declare the 'conversation' service in a standalone way
const conversationService = new ConversationService(options);

// Build the request data
const requestData: Conversation.SendMessageRequestData = {
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
    channel_priority_order: [
      'WHASAPP',
    ],
  },
};

// Use the standalone declaration of the 'conversation' service
const result: Conversation.SendMessageResponse
    = await conversationService.messages.send(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response, or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete
let result: Conversation.SendMessageResponse;
try {
  result = await conversationService.messages.send(requestData);
  console.log(`Message sent successfully. Message Id: ${result.id}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: `);
}

// Method 2: Resolve the promise
conversationService.messages.send(requestData)
  .then(response => console.log(`Message sent successfully. Message Id: ${result.id}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: `));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
