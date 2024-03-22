# Sinch server SDK for Node.js

This package contains the Sinch Client SDK for Node.js. To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

> <span style="color:red; font-weight:bold">Warning:</span>
> **This SDK is currently available to selected developers for preview use only. It is being provided for the purpose of collecting feedback, and should not be used in production environments.**

## Installation

### With NPM

```bash
npm install @sinch/sdk-core
```

### With Yarn

```bash
yarn add @sinch/sdk-core
```

## Usage

The `@sinch/sdk-core` package contains the entry point for an SDK user: the `SinchClient` class. It will use the information given in parameters to initialize the right plugins for the right APIs.

As there are different authentication schemes, the initialization method will depend on which one is used by the API.

### OAuth2 Authentication

```typescript
import { SinchClient } from '@sinch/sdk-core';

// The credentials can be found on the Account dashboard: https://dashboard.sinch.com/account/access-keys
const sinch: Pick<SinchClient, 'conversation' | 'fax' | 'numbers' | 'sms'> = new SinchClient({
    projectId: 'my-project-id',
    keyId: 'my-key-id',
    keySecret: 'my-key-secret',
});
const numbersService = sinch.numbers;

const response = await numbersService.availableRegions.list({
    types: 'LOCAL',
});
```
The initialization method above will work for the APIs that supports the authentication with OAuth2 (Numbers and SMS on US and EU regions).

### API Token authentication

If you want to use the SMS API on the other regions (or US and EU too, it will work), you'll need other credentials in order to give to the Client the `servicePlanId` and the associated `apiToken`. 

```typescript
import { SinchClient } from '@sinch/sdk-core';

// The credentials can be found on the Service APIs dashboard: https://dashboard.sinch.com/sms/api/services
const sinch: Pick<SinchClient, 'sms'> = new SinchClient({
    servicePlanId: 'my-service-plan-id',
    apiToken: 'my-key-id',
    region: 'my-region', // Optional, can be 'us', 'eu', 'br', 'au', 'ca'. Default is 'us'
});
const smsService = sinch.sms;

const response = await smsService.batches.get({
    batch_id: '01HF28S9AABBBCCCCY92BJB569',
});
```

### Signed application authentication

Both `Verification` and `Voice` APIs are using this authentication method: the request is encoded using the `Application Secret` and identified with the `Application Key`.

```typescript
import { SinchClient } from '@sinch/sdk-core';

// The credentials can be found on the Verification or Voice dashboard: 
// https://dashboard.sinch.com/verification/apps or 
// https://dashboard.sinch.com/voice/apps
const sinch: Pick<SinchClient, 'verification' | 'voice'> = new SinchClient({
  applicationId: 'my-application-key',
  applicationSecret: 'my-application-secret',
});
const verificationService = sinch.verification;

const response = await verificationService.verificationStatus.getById({
  id: '018bfc3e-1234-5678-1234-ebdb3fd6d30f',
});
```

## Examples
You can find an example of each request in the [../../examples/simple-examples](../../examples/simple-examples) folder.

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)

## Supported APIs

Here is the list of the Sinch API and there level of support by the Node.js SDK:

| API Category           | API Name                            | Status |
|------------------------|-------------------------------------|:------:|
| Messaging              | SMS API                             |   ✅    |
|                        | Conversation API                    |   ✅    |
|                        | Fax API                             |   🚧   |
| Voice and Video        | Voice API                           |   ✅    |
| Numbers & Connectivity | Numbers API                         |   ✅    |
| Verification           | Verification API                    |   ✅    |
