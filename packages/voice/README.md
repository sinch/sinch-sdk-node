# Sinch Voice SDK for Node.js

This package contains the Sinch Voice SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

<span style="color:red; font-weight:bold">Warning:</span>
**This SDK is currently available for preview purposes only. It should not be used in production environments.**


## Installation

We recommend to use this SDK as part of the `@sinch/sdk-core` package as it will take care about the authentication plugins to use.

However, it's still possible to use this SDK standalone is you need to access the Verification API only.

### With NPM

```bash
npm install @sinch/voice
```

### With Yarn

```bash
yarn add @sinch/voice
```

## Usage

### Credentials

The `Voice` API uses the Application Signed Request to authenticate against the server. You will need to provide the following credentials:
- applicationKey: one of the application keys that can be found in [Apps section](https://dashboard.sinch.com/voice/apps) of the Voice dashboard
- applicationSecret: the corresponding secret that can be found at the same place

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `voice` property of the client that you would have instantiated.

```typescript
import {
  TtsCalloutRequestData,
  GetCalloutResponseObj,
  SinchClient,
  SinchClientParameters,
} from '@sinch/sdk-core';

const credentials: SinchClientParameters = {
  applicationKey: 'APPLICATION_ID',
  applicationSecret: 'APPLICATION_SECRET',
};
const sinch = new SinchClient(credentials);

const requestData: TtsCalloutRequestData = {
  ttsCalloutRequestBody: {
    method: 'ttsCallout',
    ttsCallout: {
      destination: {
        type: 'number',
        endpoint: '+14045005000',
      },
      cli: '+14045001000',
      locale: 'en-US',
      text: 'Hello, this is a call from Sinch.',
    },
  },
};

// Access the 'voice' domain registered on the Sinch Client
const calloutResponse: GetCalloutResponseObj 
    = await sinch.voice.callouts.tts(requestData);
```

### Standalone

The SDK can be used standalone if you need to use only the Voice APIs.

```typescript
import {
  SinchClientParameters
 } from '@sinch/sdk-client';
import {
  TtsCalloutRequestData,
  GetCalloutResponseObj,
  Voice,
} from '@sinch/voice';

const credentials: SinchClientParameters = {
  applicationKey: 'APPLICATION_ID',
  applicationSecret: 'APPLICATION_SECRET',
};

// Declare the 'verification' in a standalone way
const voice = new Voice(credentials);

const requestData: TtsCalloutRequestData = {
  ttsCalloutRequestBody: {
    method: 'ttsCallout',
    ttsCallout: {
      destination: {
        type: 'number',
        endpoint: '+14045005000',
      },
      cli: '+14045001000',
      locale: 'en-US',
      text: 'Hello, this is a call from Sinch.',
    },
  },
};

// Use the standalone declaration of the 'verification' domain
const calloutResponse: GetCalloutResponseObj
  = await voice.callouts.tts(requestData);
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response or you can resolve them yourself with `then()` / `catch()`.

```typescript
// Method 1: Wait for the Promise to complete
let calloutResponse: GetCalloutResponseObj;
try {
  calloutResponse = await sinch.voice.callouts.tts(requestData);
  console.log(`callId = ${response.callId}`);
} catch (error: any) {
  console.error(`ERROR ${error.statusCode}: Impossible to make a TTS callout to the number ${requestData.ttsCalloutRequestBody.ttsCallout.destination.endpoint}`);
}

// Method 2: Resolve the promise
sinch.voice.callouts.tts(requestData)
  .then(response => console.log(`callId = ${response.callId}`))
  .catch(error => console.error(`ERROR ${error.statusCode}: Impossible to make a TTS call out to the number ${requestData.ttsCalloutRequestBody.ttsCallout.destination.endpoint}`));
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
