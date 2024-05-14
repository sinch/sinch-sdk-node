# Sinch server SDK for Node.js

This package contains the Sinch Client SDK for Node.js. To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

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

(async () => {
  // The credentials can be found on the Account dashboard: https://dashboard.sinch.com/account/access-keys
  const sinch: Pick<SinchClient, 'conversation' | 'elasticSipTrunking' | 'fax' | 'numbers' | 'sms'> = new SinchClient({
    projectId: 'my-project-id',
    keyId: 'my-key-id',
    keySecret: 'my-key-secret',
  });
  const numbersService = sinch.numbers;
  
  const response = await numbersService.availableRegions.list({
    types: ['LOCAL'],
  });
})();
```
The initialization method above will work for the APIs that supports the authentication with OAuth2 (Numbers and SMS on US and EU regions).

### API Token authentication

If you want to use the SMS API on the other regions (or US and EU too, it will work), you'll need other credentials in order to give to the Client the `servicePlanId` and the associated `apiToken`. 

```typescript
import { SinchClient } from '@sinch/sdk-core';

(async () => {
  // The credentials can be found on the Service APIs dashboard: https://dashboard.sinch.com/sms/api/services
  const sinch: Pick<SinchClient, 'sms'> = new SinchClient({
    servicePlanId: 'my-service-plan-id',
    apiToken: 'my-key-id',
    smsRegion: 'my-region', // Optional, can be 'us', 'eu', 'br', 'au', 'ca'. Default is 'us'
  });
  const smsService = sinch.sms;
  
  const response = await smsService.batches.get({
    batch_id: '01HF28S9AABBBCCCCY92BJB569',
  });
})();
```

### Signed application authentication

Both `Verification` and `Voice` APIs are using this authentication method: the request is encoded using the `Application Secret` and identified with the `Application Key`.

```typescript
import { SinchClient } from '@sinch/sdk-core';

(async () => {
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
})();
```

## Importing classes and interfaces from other API packages

For convenience, importing `@sinch/sdk-core` is sufficient to be able to access to all the APIs' classes and interfaces. In case you need to use a single API, they are also packaged as single NPM packages:
 - SMS: [`@sinch/sms`](https://www.npmjs.com/package/@sinch/sms)
 - Conversation: [`@sinch/conversation`](https://www.npmjs.com/package/@sinch/conversation)
 - Elastic SIP Trunking: [`@sinch/elastic-sip-trunking`](https://www.npmjs.com/package/@sinch/elastic-sip-trunking)
 - Fax: [`@sinch/fax`](https://www.npmjs.com/package/@sinch/fax)
 - Numbers: [`@sinch/numbers`](https://www.npmjs.com/package/@sinch/numbers)
 - Verification: [`@sinch/verification`](https://www.npmjs.com/package/@sinch/verification)
 - Voice: [`@sinch/voice`](https://www.npmjs.com/package/@sinch/voice)

All the interfaces are exported with an alias, equal to the API name: 
 - `Sms` for the SMS API
 - `Conversation` for the Conversation API
 - `ElasticSipTrunking` for the Elastic SIP Trunking API
 - `Fax` for the Fax API
 - `Numbers` for the Numbers API
 - `Verification` for the Verification API
 - `Voice` for the Voice API

Here is an example about using the TypeScript types to send a fax:

```typescript
import { 
  Fax,          // "Fax" is the alias under which are exported all the interfaces
  FaxService,   // This is a class so it is exported as is
  SinchClient,
} from '@sinch/sdk-core';

(async () => {
  const sinch = new SinchClient({
    projectId: 'my-project-id',
    keyId: 'my-key-id',
    keySecret: 'my-key-secret',
  });
  
  const faxService: FaxService = sinch.fax;
  
  const requestData: Fax.SendFaxRequestData = {
    sendFaxRequestBody: {
      to: 'a valid destination number',
      from: 'a valid origin number',
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
    },
  };
  
  const response: Fax.Fax = await faxService.faxes.send(requestData);
})();
```

## Importing classes for CommonJS

Until now, all the examples in this documentation are showcasing ES modules but there may be some cases when the SDK user will want to use CommonJS instead.

Here is an example to do the same as above with CommonJS (using `require`):
```javascript
const { SinchClient } = require('@sinch/sdk-core');

(async () => {
  const sinch = new SinchClient({
    projectId: 'YOUR_project_id',
    keyId: 'YOUR_access_key',
    keySecret: 'YOUR_access_secret',
  });
  
  const faxService = sinch.fax;
  
  const requestData = {
    sendFaxRequestBody: {
      to: 'a valid destination number',
      from: 'a valid origin number',
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
    },
  };
  
  const response = await faxService.faxes.send(requestData);
})();
```

## SinchClient parameters override

### Hostname and region override

For various reasons (development phase, testing, network restrictions, ...), one may need to update the default API endpoint, pointing to production.
Each API exposes dedicated parameters to override the default hostname and region:

| API Name              | Parameter                          | Region             |
|-----------------------|------------------------------------|--------------------|
| Authentication        | authHostname                       | N/A                |
| SMS                   | smsHostname                        | smsRegion          |
| Conversation          | conversationHostname               | conversationRegion |
|                       | conversationTemplatesHostname      | conversationRegion |
| Elastic SIP Trunking  | elasticSipTrunkingHostname         | N/A                |
| Fax                   | faxHostname                        | faxRegion          |
| Voice                 | voiceHostname                      | voiceRegion        |
|                       | voiceApplicationManagementHostname | N/A                |
| Numbers               | numbersHostname                    | N/A                |
| Verification          | verificationHostname               | N/A                |

And here are the list of supported regions per regionalized API:

| Api Name     | Supported regions                                             |
|--------------|---------------------------------------------------------------|
| SMS          | SmsRegion.UNITED_STATES                                       |
|              | SmsRegion.EUROPE                                              |
|              | SmsRegion.BRAZIL (not available for OAuth2 authentication)    |
|              | SmsRegion.CANADA (not available for OAuth2 authentication)    |
|              | SmsRegion.AUSTRALIA (not available for OAuth2 authentication) |
| Conversation | ConversationRegion.UNITED_STATES                              |
|              | ConversationRegion.EUROPE                                     |
|              | ConversationRegion.BRAZIL                                     |
| Fax          | FaxRegion.DEFAULT                                             |
|              | FaxRegion.UNITED_STATES                                       |
|              | FaxRegion.EUROPE                                              |
|              | FaxRegion.SOUTH_AMERICA                                       |
|              | FaxRegion.SOUTHEAST_ASIA_1                                    |
|              | FaxRegion.SOUTHEAST_ASIA_2                                    |
| Voice        | VoiceRegion.DEFAULT                                           |
|              | VoiceRegion.UNITED_STATES                                     |
|              | VoiceRegion.EUROPE                                            |
|              | VoiceRegion.SOUTH_AMERICA                                     |
|              | VoiceRegion.SOUTHEAST_ASIA_1                                  |
|              | VoiceRegion.SOUTHEAST_ASIA_2                                  |

**Use case #1:** overriding the region in production

```typescript
import { SinchClientParameters } from '@sinch/sdk-core';

const conversationClientParametersEurope: SinchClientParameters = {
  projectId: 'my-project-id',
  keyId: 'my-key-id',
  keySecret: 'my-key-secret',
  conversationRegion: ConversationRegion.EUROPE,
};
```
**Use case #2:** overriding the hostname
```typescript
import { SinchClientParameters } from '@sinch/sdk-core';

const conversationClientParametersForTest: SinchClientParameters = {
  projectId: 'my-project-id',
  keyId: 'my-key-id',
  keySecret: 'my-key-secret',
  authHostname: 'http://my-test-server:3000',
  conversationHostname: 'http://my-test-server:3001',
  conversationTemplatesHostname: 'http://my-test-server:3002',
};
```
**Note**: when overriding the hostname, the `region` parameter becomes obsolete and is not taken into account when sending the request.

**Note**: The region parameter is permissive: instead of the pre-defined list, you can also set any `string`. This covers the case where a new region is added (in production or in preview) and the SDK is not yet ready to support it or the SDK user doesn't want to update its SDK version to benefit from it.
```typescript
import { SinchClientParameters } from '@sinch/sdk-core';

const conversationClientParametersNewRegion: SinchClientParameters = {
    projectId: 'my-project-id',
    keyId: 'my-key-id',
    keySecret: 'my-key-secret',
    conversationRegion: 'bzh',
};
```

On top of that, once you have instantiated an API service, it is possible to override the hostname and the region (in case the API endpoint is regionalized). The services expose the following methods:
 - `setHostname()`
 - `setRegion()`

These methods can be used at service level (all the APIs will be updated) or at API domain level (for updating only one at a time):

**Use case #1:** overriding the hostname per API domain

```typescript
import { SinchClient } from '@sinch/sdk-core';

const sinch: SinchClient = new SinchClient({
  projectId: 'my-project-id',
  keyId: 'my-key-id',
  keySecret: 'my-key-secret',
});
const numbersService = sinch.numbers;
numbersService.setHostname('https://my.new.server');
numbersService.activeNumber.setHostname('https://my.other.server');
// Result:
// numbers.availableRegions -> https://my.new.server
// numbers.availableNumber  -> https://my.new.server
// numbers.activeNumber     -> https://my.other.server
// numbers.callbacks        -> https://my.new.server
```

**Use case #2:** overriding the production region per API domain
import { SinchClient } from '@sinch/sdk-core';

```typescript
import { SinchClient, VoiceRegion } from '@sinch/sdk-core';

const sinch: SinchClient = new SinchClient({
  projectId: 'my-project-id',
  keyId: 'my-key-id',
  keySecret: 'my-key-secret',
});
const voiceService = sinch.voice;
voiceService.setRegion(VoiceRegion.SOUTH_AMERICA);
voiceService.calls.setRegion(VoiceRegion.SOUTHEAST_ASIA_2);
// Result:
// voice.applications -> https://callingapi.sinch.com (This one is not regionalized !)
// voice.conferences  -> https://calling-sae1.api.sinch.com
// voice.calls        -> https://calling-apse2.api.sinch.com
// voice.callouts     -> https://calling-sae1.api.sinch.com
```

### Request and response plugins addition

When instantiating a service, it creates an ApiClient behind the scene (find more in the [@sinch/sdk-client](../sdk-client/README.md) package) which contains some default plugins:
 - request plugins: `VersionRequest` which will add a `user-agent` with the used version of the SDK and Node.js running the program
 - response plugins:
   - `TimezonePlugin` which will ensure that all the dates returned by the server contain a timezone
   - `ExceptionPlugin` which will catch all invalid response from the server and format them in a common way to handle exceptions

On top of that, the Service will add its own plugins:
 - for OAuth2 authentication: `Oauth2TokenRequest`
 - for API Token authentication: `ApiTokenRequest`
 - for Application Signed authentication: `XTimestampRequest` and `SigningRequest`

And on top on these plugins, it is possible to add even more of them (existing ones or custom ones) with the following properties of the `SinchClientParameters`:
 - `requestPlugins`
 - `responsePlugins`

```typescript
import { SinchClient, AdditionalHeadersRequest, buildHeader } from '@sinch/sdk-core';

const sinch: SinchClient = new SinchClient({
  projectId: 'my-project-id',
  keyId: 'my-key-id',
  keySecret: 'my-key-secret',
  requestPlugins: [
    new AdditionalHeadersRequest({
      headers: buildHeader('customHeader', 'customHeaderValue'),
    }),
  ],
});
// => All the requests using services registered on this SinchClient will send an extra-header
```

## Examples
You can find an example of each request in the [../../examples/simple-examples](../../examples/simple-examples) folder.

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)

## Supported APIs

Here is the list of the Sinch API and there level of support by the Node.js SDK:

| API Category           | API Name                          | Status |
|------------------------|-----------------------------------|:------:|
| Messaging              | SMS API                           |   ✅    |
|                        | Conversation API                  |   ✅    |
|                        | Fax API `(beta)`                  |   ✅    |
| Voice and Video        | Voice API                         |   ✅    |
|                        | Elastic SIP Trunking API `(beta)` |   ✅    |
| Numbers & Connectivity | Numbers API                       |   ✅    |
| Verification           | Verification API                  |   ✅    |

> Note: `(beta)` means that the underlying API product is still in beta version and requires specific actions for the end user to be able to use it. Please check on the dashboard or with your account manager.
