# Sinch Verification SDK for Node.js

This package contains the Sinch Verification SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

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
  Verification,
  SinchClient,
  ApplicationCredentials, 
  VerificationService,
} from '@sinch/sdk-core';

const credentials: ApplicationCredentials = {
  applicationKey: 'APPLICATION_ID',
  applicationSecret: 'APPLICATION_SECRET',
};

// Access the 'verification' service registered on the Sinch Client
const sinch = new SinchClient(credentials);
const verificationService: VerificationService = sinch.verification;

// Build the request data
const requestData: Verification.StartVerificationRequestData = {
  initiateVerificationRequestBody: {
    identity: {
      type: 'number',
      endpoint: '+17813334444',
    },
    method: 'sms',
  },
};

// Use the 'verification' service registered on the Sinch client
const verificationInitResponse: Verification.InitiateVerificationResponse
  = await verificationService.verifications.start(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Verification APIs.

```typescript
import {
  ApplicationCredentials
 } from '@sinch/sdk-client';
import {
  Verification,
  VerificationService,
} from '@sinch/verification';

const credentials: ApplicationCredentials = {
  applicationKey: 'APPLICATION_ID',
  applicationSecret: 'APPLICATION_SECRET',
};

// Declare the 'verification' service in a standalone way
const verificationService = new VerificationService(credentials);

// Build the request data
const requestData: Verification.StartVerificationRequestData = {
  initiateVerificationRequestBody: {
    identity: {
      type: 'number',
      endpoint: '+17813334444',
    },
    method: 'sms',
  },
};

// Use the standalone declaration of the 'verification' service
const verificationInitResponse: Verification.InitiateVerificationResponse 
    = await verificationService.verifications.start(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response, or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete (you need to be in an 'async' method)
let verificationInitResponse: Verification.InitiateVerificationResponse;
try {
  verificationInitResponse = await verificationService.verifications.start(requestData);
  console.log(`Verification ID = ${verificationInitResponse.id}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: Impossible to start the verification for the number ${requestData.initiateVerificationRequestBody.identity.endpoint}`);
}

// Method 2: Resolve the promise
verificationService.verifications.start(requestData)
  .then(response => console.log(`Verification ID = ${response.id}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: Impossible to start the verification for the number ${requestData.initiateVerificationRequestBody.identity.endpoint}`));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
