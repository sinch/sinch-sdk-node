# Sinch Fax SDK for Node.js

This package contains the Sinch Fax SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

<span style="color:red; font-weight:bold">Warning:</span>
**This SDK is currently available for preview purposes only. It should not be used in production environments.**

## Installation

We recommend to use this SDK as part of the [`@sinch/sdk-core`](../../packages/sdk-core) package in order to make the most out of all the Sinch products.

However, it's still possible to use this SDK standalone is you need to access the Fax API only.

### With NPM

```bash
npm install @sinch/fax
```

### With Yarn

```bash
yarn add @sinch/fax
```

## Usage

### Credentials

The `Fax` API uses the Sinch unified authentication with OAuth2. You will need to provide the following credentials:
 - projectId: can be found in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
 - keyId:: can be found in your Access key list in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
 - keySecret: can be found **ONLY** when generating a new access key: keep it safe!

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `fax` property of the client that you would have instantiated.

```typescript
import {
  FaxService,
  Fax,
  SinchClient,
  UnifiedCredentials,
} from '@sinch/sdk-core';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Access the 'fax' service registered on the Sinch Client
const sinch = new SinchClient(credentials);
const faxService: FaxService = sinch.fax;

// Build the request data
const requestData: Fax.SendFaxRequestData = {
  sendFaxRequestBody: {
    to: '+12015555555',
    contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
    callbackUrl: 'https://yourserver/incomingFax',
  },
};

// Use the 'fax' service registered on the Sinch client
const response = await faxService.faxes.send(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Fax APIs.

```typescript
import {
  UnifiedCredentials,
} from '@sinch/sdk-client';
import {
  FaxService,
  Fax,
} from '@sinch/fax';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Declare the 'fax' service in a standalone way
const faxService = new FaxService(credentials);

// Build the request data
const requestData: Fax.SendFaxRequestData = {
  sendFaxRequestBody: {
    to: '+12015555555',
    contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
    callbackUrl: 'https://yourserver/incomingFax',
  },
};

// Use the standalone declaration of the 'fax' service
const response = await faxService.faxes.send(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response, or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete (you need to be in an 'async' method)
let sendFaxResult: Fax.Fax;
try {
  sendFaxResult = await faxService.faxes.send(requestData);
  console.log(`Fax successfully created at '${sendFaxResult.createTime}'. Status = '${sendFaxResult.status}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: Impossible to crete the fax sent to ${requestdata.to}.`);
}

// Method 2: Resolve the promise
faxService.faxes.send(requestData)
  .then(response => console.log(`Fax successfully created at '${sendFaxResult.createTime}'. Status = '${sendFaxResult.status}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: Impossible to crete the fax sent to ${requestdata.to}.`));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
