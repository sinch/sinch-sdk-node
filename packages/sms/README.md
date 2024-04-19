# Sinch SMS SDK for Node.js

This package contains the Sinch SMS SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

## Installation

We recommend to use this SDK as part of the [`@sinch/sdk-core`](../../packages/sdk-core) package in order to make the most out of all the Sinch products.

However, it's still possible to use this SDK standalone is you need to access the SMS API only.

### With NPM

```bash
npm install @sinch/sms
```

### With Yarn

```bash
yarn add @sinch/sms
```

## Usage

### Credentials

The `SMS` API uses the Sinch unified authentication with OAuth2 **for the US and EU regions only**. You will need to provide the following credentials:
- projectId: can be found in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
- keyId:: can be found in your Access key list in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
- keySecret: can be found **ONLY** when generating a new access key: keep it safe!

If you want to use the other regions (BR, AU or CA) or if you prefer to use this type of credential for US or EU, you can use the API Token authentication. You will need to provide the following credentials:
- servicePlanId: can be found in the SMS dashboard, under [Services Apis](https://dashboard.sinch.com/sms/api/services)
- apiToken: can be found in the SMS dashboard, under [Services Apis](https://dashboard.sinch.com/sms/api/services)


### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `sms` property of the client that you would have instantiated.

```typescript
import { 
  Sms,
  SmsService,
  SinchClient,
  ServicePlanIdCredentials,
  UnifiedCredentials,
  SmsRegion,
} from '@sinch/sdk-core';

const credentialsWithProjectId: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
  smsRegion: SmsRegion.UNITED_STATES, // Optional, default is 'us'. Only other possibility is 'eu'
};
// Access the 'sms' service registered on the Sinch Client
const sinchClientCreatedWithProjectId = new SinchClient(credentialsWithProjectId);
const smsServiceWithProjectId: SmsService = sinchClientCreatedWithProjectId.sms;

const credentialsWithServicePlanId: ServicePlanIdCredentials = {
  servicePlanId: 'SERVICE_PLAN_ID',
  apiToken: 'API_TOKEN',
  smsRegion: SmsRegion.UNITED_STATES, // Optional, default is 'us'. Other possibilities are 'eu', 'br', 'au' and 'ca'
};
// Access the 'sms' service registered on the Sinch Client
const sinchClientCreatedWithServicePlanId = new SinchClient(credentialsWithServicePlanId);
const smsServiceWithServicePlanId: SmsService = sinchClientCreatedWithServicePlanId.sms;

// Build the request data
const requestData: Sms.SendSMSRequestData = {
  sendSMSRequestBody: {
    to: [
       '+12223334444',
       '+12223335555',
    ],
    from: '+12228889999',
    parameters: {
       name: {
          '+12223334444': 'John',
          default: 'there',
       },
    },
    body: 'Hi ${name}',
    type: 'mt_text', 
  },
};

// Use the 'sms' service registered on the Sinch client
// The request will be authenticated with OAuth2 and sent to https://zt.us.sms.api.sinch.com
const availabilityResult_1: Sms.SendSMSResponse 
    = await smsServiceWithProjectId.batches.send(requestData);

// Use the 'sms' service registered on the Sinch client
// The request will be authenticated with the API Token and sent to https://us.sms.api.sinch.com
const availabilityResult_2: Sms.SendSMSResponse 
    = await smsServiceWithServicePlanId.batches.send(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the SMS APIs. As for a usage with the Sinch Client, you can choose to use the `projectId` or `servicePlanId` credentials.

```typescript
import {
  SmsRegion,
  ServicePlanIdCredentials,
  UnifiedCredentials,
 } from '@sinch/sdk-client';
import { 
  Sms,
  SmsService,
} from '@sinch/sms';

const credentialsWithProjectId: UnifiedCredentials = {
  projectId: 'PROJECT_ID',
  keyId: 'KEY_ID',
  keySecret: 'KEY_SECRET',
  smsRegion: SmsRegion.UNITED_STATES, // Optional, default is 'us'. Only other possibility is 'eu'
};
// Declare the 'sms' service in a standalone way
const smsServiceWithProjectId = new SmsService(credentialsWithProjectId);

const credentialsWithServicePlanId: ServicePlanIdCredentials = {
  servicePlanId: 'SERVICE_PLAN_ID',
  apiToken: 'API_TOKEN',
  smsRegion: SmsRegion.UNITED_STATES, // Optional, default is 'us'. Other possibilities are 'eu', 'br', 'au' and 'ca'
};
// Declare the 'sms' service in a standalone way
const smsServiceWithServicePlanId = new SmsService(credentialsWithServicePlanId);

// Build the request data
const requestData: Sms.SendSMSRequestData = {
    // some request parameters
};

// Use the standalone declaration of the 'sms' service
// The request will be authenticated with OAuth2 and sent to https://zt.us.sms.api.sinch.com
const response_1: Sms.SendSMSResponse = await smsServiceWithProjectId.batches.send(requestData);

// Use the standalone declaration of the 'sms' service
// The request will be authenticated with the API Token and sent to https://us.sms.api.sinch.com
const response_2: Sms.SendSMSResponse = await smsServiceWithServicePlanId.batches.send(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response, or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete (you need to be in an 'async' method)
let batchResponse: Sms.SendSMSResponse;
try {
  batchResponse = await smsService.batches.send(requestData);
  console.log(`The SMS has been sent successfully: batch id = ${batchResponse.id}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: the SMS could not be sent`);
}

// Method 2: Resolve the promise
smsService.batches.send(requestData)
  .then(response => console.log(`The SMS has been sent successfully: batch id = ${response.id}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: the SMS could not be sent`));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
