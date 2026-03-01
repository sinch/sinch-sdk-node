# Sinch Number Lookup SDK for Node.js

This package contains the Sinch Number Lookup SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

## Installation

We recommend to use this SDK as part of the [`@sinch/sdk-core`](../../packages/sdk-core) package in order to make the most out of all the Sinch products.

However, it's still possible to use this SDK standalone is you need to access the Number Lookup API only.

### With NPM

```bash
npm install @sinch/number-lookup
```

### With Yarn

```bash
yarn add @sinch/number-lookup
```

## Usage

### Credentials

The `Number Lookup` API uses the Sinch unified authentication with OAuth2. You will need to provide the following credentials:
 - projectId: can be found in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
 - keyId:: can be found in your Access key list in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
 - keySecret: can be found **ONLY** when generating a new access key: keep it safe!

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `numberLookup` property of the client that you would have instantiated.

```typescript
import { 
  NumberLookup,
  NumberLookupService,
  SinchClient,
  UnifiedCredentials,
} from '@sinch/sdk-core';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Access the 'numberLookup' service registered on the Sinch Client
const sinch = new SinchClient(credentials);
const numberLookupService: NumberLookupService = sinch.numberLookup;

// Build the request data
const requestData: NumberLookup.NumberLookupRequestData = {
  numberLookupRequestBody: {
    number: +17813334444,
  },
};

// Use the 'numberLookup' service registered on the Sinch client
const lookupResult: NumberLookup.NumberLookupResponse 
    = await numberLookupService.lookup(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Number Lookup APIs.

```typescript
import {
  UnifiedCredentials,
} from '@sinch/sdk-client';
import {
  NumberLookup,
  NumberLookupService,
} from '@sinch/number-lookup';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Declare the 'numberLookup' service in a standalone way
const numberLookupService  = new NumberLookupService(credentials);

// Build the request data
const requestData: NumberLookup.NumberLookupRequestData = {
  numberLookupRequestBody: {
    number: +17813334444,
  },
};

// Use the standalone declaration of the 'numberLookup' service
const lookupResult: NumberLookup.NumberLookupResponse
  = await numberLookupService.lookup(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response, or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete (you need to be in an 'async' method)
let lookupResult: NumberLookup.NumberLookupResponse;
try {
  lookupResult = await numberLookupService.lookup(requestData);
  console.log(`The phone number '${lookupResult.number}' is of type '${lookupResult.line?.type}'`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode} when performing a lookup for the phone number "${requestData.numberLookupRequestBody.number}"`);
}

// Method 2: Resolve the promise
numberLookupService.lookup(requestData)
  .then(response => console.log(`Phone number: ${response.phoneNumber} - Type: ${response.type}`))
  .catch(error => console.error(`ERROR ${error.statusCode} when performing a lookup for the phone number "${requestData.numberLookupRequestBody.number}"`));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
