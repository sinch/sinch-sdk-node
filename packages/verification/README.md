# Sinch Verification SDK for Node.js

This package contains the Sinch Verification SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

<span style="color:red; font-weight:bold">Warning:</span>
**This SDK is currently available for preview purposes only. It should not be used in production environments.**


## Installation

We recommend to use this SDK as part of the [`@sinch/sdk-core`](../../packages/sdk-core) package in order to make the most out of all the Sinch products.

However, it's still possible to use this SDK standalone is you need to access the Verification API only.

### With NPM

```bash
npm install @sinch/verification
```

### With Yarn

```bash
yarn add @sinch/verification
```

## Usage

### Credentials

The `Verification` API uses the Application Signed Request to authenticate against the server. You will need to provide the following credentials:
- applicationKey: one of the application keys that can be found in [Apps section](https://dashboard.sinch.com/verification/apps) of the Verification dashboard
- applicationSecret: the corresponding secret that can be found at the same place

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `verification` property of the client that you would have instantiated.

```typescript
import { 
  InitiateVerificationResponse,
  StartVerificationRequestData,
  SinchClient,
  ApplicationCredentials,
} from '@sinch/sdk-core';

const credentials: ApplicationCredentials = {
  applicationKey: 'APPLICATION_ID',
  applicationSecret: 'APPLICATION_SECRET',
};
const sinch = new SinchClient(credentials);

const requestData: StartVerificationRequestData = {
  initiateVerificationRequestBody: {
    identity: {
      type: 'number',
      endpoint: '+17813334444',
    },
    method: 'sms',
  },
};

// Access the 'verification' controller registered on the Sinch Client
const verificationInitResponse: InitiateVerificationResponse 
    = await sinch.verification.verifications.start(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Verification APIs.

```typescript
import {
  ApplicationCredentials
 } from '@sinch/sdk-client';
import { 
  InitiateVerificationResponse,
  StartVerificationRequestData,
  Verification,
} from '@sinch/verification';

const credentials: ApplicationCredentials = {
  applicationKey: 'APPLICATION_ID',
  applicationSecret: 'APPLICATION_SECRET',
};

// Declare the 'verification' controller in a standalone way
const verification = new Verification(credentials);

const requestData: StartVerificationRequestData = {
  initiateVerificationRequestBody: {
    identity: {
      type: 'number',
      endpoint: '+17813334444',
    },
    method: 'sms',
  },
};

// Use the standalone declaration of the 'verification' controller
const verificationInitResponse: InitiateVerificationResponse 
    = await verification.verifications.start(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response, or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete (you need to be in an 'async' method)
let verificationInitResponse: InitiateVerificationResponse;
try {
  verificationInitResponse = await sinch.verification.verifications.start(requestData);
  console.log(`Verification ID = ${verificationInitResponse.id}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: Impossible to start the verification for the number ${requestData.initiateVerificationRequestBody.identity.endpoint}`);
}

// Method 2: Resolve the promise
sinch.verification.verifications.start(requestData)
  .then(response => console.log(`Verification ID = ${response.id}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: Impossible to start the verification for the number ${requestData.initiateVerificationRequestBody.identity.endpoint}`));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
