# Sinch Elastic SIP Trunking SDK for Node.js

This package contains the Sinch Elastic SIP Trunking SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

## Installation

We recommend to use this SDK as part of the `@sinch/sdk-core` package as it will take care about the authentication plugins to use.

However, it's still possible to use this SDK standalone is you need to access the Elastic SIP Trunking API only.

### With NPM

```bash
npm install @sinch/elastic-sip-trunking
```

### With Yarn

```bash
yarn add @sinch/elastic-sip-trunking
```

## Usage

### Credentials

The `Elastic SIP Trunking` API uses the Sinch unified authentication with OAuth2. You will need to provide the following credentials:
- projectId: can be found in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
- keyId:: can be found in your Access key list in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
- keySecret: can be found **ONLY** when generating a new access key: keep it safe!

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `elasticSipTrunking` property of the client that you would have instantiated.

```typescript
import {
  ElasticSipTrunkingService,
  ElasticSipTrunking,
  SinchClient,
  UnifiedCredentials,
} from '@sinch/sdk-core';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Access the 'elasticSipTrunking' service registered on the Sinch Client
const sinch = new SinchClient(credentials);
const elasticSipTrunkingService: ElasticSipTrunkingService = sinch.elasticSipTrunking;

// Build the request data
const requestData: ElasticSipTrunking.CreateSipTrunkRequestData = {
  createSipTrunkRequestBody: {
    name: 'Acme Trunk',
    hostName: 'acme-domain-1',
  }
};

// Use the 'elasticSipTrunking' service registered on the Sinch Client
const result = await sinch.elasticSipTrunking.sipTrunks.create(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Elastic SIP Trunking APIs.

```typescript
import {
  UnifiedCredentials,
} from '@sinch/sdk-client';
import {
  ElasticSipTrunkingService,
  ElasticSipTrunking,
} from '@sinch/elastic-sip-trunking';

const credentials: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
};

// Declare the 'elasticSipTrunking' service in a standalone way
const elasticSipTrunkingService = new ElasticSipTrunkingService(options);

// Build the request data
const requestData: ElasticSipTrunking.CreateSipTrunkRequestData = {
  createSipTrunkRequestBody: {
    name: 'Acme Trunk',
    hostName: 'acme-domain-1',
  }
};

// Use the standalone declaration of the 'elasticSipTrunking' service
const result = await elasticSipTrunkingService.sipTrunks.create(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete
let result: ElasticSipTrunking.SipTrunk;
try {
  result = await elasticSipTrunkingService.sipTrunks.create(requestData);
  console.log(`SIP trunk successfully created at '${response.createTime.toISOString()}' with the id '${response.id}'`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: Impossible to create a SIP Trunk with the hostname '${requestData.hostName}'`);
}

// Method 2: Resolve the promise
elasticSipTrunkingService.sipTrunks.create(requestData)
  .then(response => console.log(`SIP trunk successfully created at '${response.createTime.toISOString()}' with the id '${response.id}'`))
  .catch(error => console.error(`ERROR ${error.statusCode}: Impossible to create a SIP Trunk with the hostname '${requestData.hostName}'`));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
