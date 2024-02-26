# Sinch Numbers SDK for Node.js

This package contains the Sinch Numbers SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

> <span style="color:red; font-weight:bold">Warning:</span>
> **This SDK is currently available to selected developers for preview use only. It is being provided for the purpose of collecting feedback, and should not be used in production environments.**

## Installation

We recommend to use this SDK as part of the [`@sinch/sdk-core`](../../packages/sdk-core) package in order to make the most out of all the Sinch products.

However, it's still possible to use this SDK standalone is you need to access the Numbers API only.

### With NPM

```bash
npm install @sinch/numbers
```

### With Yarn

```bash
yarn add @sinch/numbers
```

## Usage

### Credentials

The `Numbers` API uses the Sinch unified authentication with OAuth2. You will need to provide the following credentials:
 - projectId: can be found in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
 - keyId:: can be found in your Access key list in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
 - keySecret: can be found **ONLY** when generating a new access key: keep it safe!

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `numbers` property of the client that you would have instantiated.

```typescript
import { 
  AvailableNumber,
  GetAvailableNumberRequestData,
  SinchClient,
  UnifiedCredentials,
} from '@sinch/sdk-core';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

const sinch = new SinchClient(credentials);

const requestData: GetAvailableNumberRequestData = {
  phoneNumber: '+17813334444',
};

// Access the 'numbers' domain registered on the Sinch Client
const availabilityResult: AvailableNumber 
    = await sinch.numbers.availableNumber.checkAvailability(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Numbers APIs.

```typescript
import {
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { 
  AvailableNumber,
  GetAvailableNumberRequestData,
  Numbers,
} from '@sinch/numbers';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Declare the 'numbers' controller in a standalone way
const numbers = new Numbers(credentials);

const requestData: GetAvailableNumberRequestData = {
  phoneNumber: '+17813334444',
};

// Use the standalone declaration of the 'numbers' controller
const availabilityResult: AvailableNumber 
    = await numbers.availableNumber.checkAvailability(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response, or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete (you need to be in an 'async' method)
let availabilityResult: AvailableNumber;
try {
  availabilityResult = await sinch.numbers.availableNumber.checkAvailability(requestData);
  console.log(`Phone number: ${availabilityResult.phoneNumber} - Type: ${availabilityResult.type}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: the phone number ${requestData.phoneNumber} is not available`);
}

// Method 2: Resolve the promise
sinch.numbers.availableNumber.checkAvailability(requestData)
  .then(response => console.log(`Phone number: ${response.phoneNumber} - Type: ${response.type}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: the phone number ${requestData.phoneNumber} is not available`));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
