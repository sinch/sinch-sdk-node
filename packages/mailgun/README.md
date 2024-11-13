# Sinch Mailgun SDK for Node.js

This package contains the Sinch Mailgun SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

In case Mailgun is not yet integrated with Sinch in your market, you will need to [create a Mailgun account](https://signup.mailgun.com/new/signup?) or [log in](https://login.mailgun.com/login/) if you already have one.

## Installation

We recommend to use this SDK as part of the `@sinch/sdk-core` package as it will take care about the authentication plugins to use.

However, it's still possible to use this SDK standalone is you need to access the Mailgun API only.

### With NPM

```bash
npm install @sinch/mailgun
```

### With Yarn

```bash
yarn add @sinch/mailgun
```

## Usage

### Credentials

The `Mailgun` API uses an API key to identify and authenticate the caller: it can be found in your [Mailgun Dashboard](https://app.mailgun.com/settings/api_security).

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `mailgun` property of the client that you would have instantiated.

```typescript
import {
  Mailgun,
  SinchClient,
  SinchClientParameters,
} from '@sinch/sdk-core';

const credentials: SinchClientParameters = {
  mailgunApiKey: 'MAILGUN_API_KEY',
};

const sinch = new SinchClient(credentials);

const requestData: Mailgun.SendEmailRequest = {
  from: 'sender@sinch.com',
  to: 'recipient@sinch.com',
  subject: 'First email from the Node.js SDK',
  html: 'Hello!<br>This is an email sent with the <span color="blue">Node.js SDK</span>.',
};

// Access the 'mailgun' domain registered on the Sinch Client
const result: Mailgun.SendEmailResponse
    = await sinch.mailgun.emails.sendEmail(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Mailgun APIs.

```typescript
import {
  Mailgun,
  SinchClientParameters,
} from '@sinch/sdk-client';
import {

} from '@sinch/mailgun';

const credentials: SinchClientParameters = {
  mailgunApiKey: 'MAILGUN_API_KEY',
};

// Declare the 'mailgun' service in a standalone way
const mailgun = new Mailgun(credentials);

const requestData: Mailgun.SendEmailRequest = {
  from: 'sender@sinch.com',
  to: 'recipient@sinch.com',
  subject: 'First email from the Node.js SDK',
  html: 'Hello!<br>This is an email sent with the <span color="blue">Node.js SDK</span>.',
};

// Use the standalone declaration of the 'mailgun' domain
const result: Mailgun.SendEmailResponse
  = await mailgun.emails.sendEmail(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete
let sendEmailResponse: Mailgun.SendEmailResponse;
try {
  sendEmailResponse = await sinch.mailgun.emails.sendEmail(requestData);
  console.log(`Message id = ${sendEmailResponse.id}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: `);
}

// Method 2: Resolve the promise
sinch.mailgun.emails.sendEmail(requestData)
  .then(response => console.log(`Message id = ${response.id}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: `));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
