# Webhooks management with the Sinch Node.js SDK

This directory contains a Node.js application built with [Nest.js](https://docs.nestjs.com/) to illustrate how to manage webhooks sent by the Sinch platform with the Sinch Node.js SDK.

# Prerequisites

## Running the Nest.js application

Before trying to run a sample, make sure you have Node.js installed: please follow the instruction on the [simple-examples README](../simple-examples/README.md).

Once you have made sure that Node.js is installed, you can install the dependencies and start the Nest.js server:

```bash
# With NPM
npm install
npm run start

# With Yarn
yarn
yarn run start
```

## Configuring a network tunnel with ngrok

You can use any method you want to make your server accessible over the internet, but we like ngrok, and it's what we'll use in this sample. You can install it via their [download page](https://ngrok.com/download) and follow all the steps to get it configured.

Once ready, start the tunnel to redirect the request to your local Nest.js application running on the port 3000:

```bash
ngrok start 3000
```

You should see in the terminal something like this:
```bash
Session Status                online                                                                 
Account                       Your NAME (Plan: Free)                                              
Update                        update available (version 3.6.0, Ctrl-U to update)                     
Version                       3.4.0                                                                  
Region                        Europe (eu)                                                            
Latency                       33ms                                                                   
Web Interface                 http://127.0.0.1:4040                                                  
Forwarding                    https://ef75-92-95-245-242.ngrok-free.app -> http://localhost:3000
```
Note the URL on the last line, ending with `.ngrok-free.app`: this is the public URL of your Nest.js app, and we will use it to configure the callbacks for the different domains.

# Managing Webhooks

## Numbers

Numbers callback will be triggered when one of the following events happen on a number that you own:
 - `PROVISIONING_TO_SMS_PLATFORM`
 - `DEPROVISIONING_FROM_SMS_PLATFORM`
 - `PROVISIONING_TO_VOICE_PLATFORM`
 - `DEPROVISIONING_FROM_VOICE_PLATFORM`
 - `PROVISIONING_TO_CAMPAIGN`
 - `DEPROVISIONING_FROM_CAMPAIGN`

Configuring a callback URL is not handled by the dashboard at the moment, but you can associate a callback to a number using the propery `callbackUrl` present in the following actions:
 - `availableNumber.rent()`: example [here](../simple-examples/src/numbers/available/rent.ts)
 - `availableNumber.rentAny()`: example [here](../simple-examples/src/numbers/available/rentAny.ts)
 - `activeNumber.update()`: : example [here](../simple-examples/src/numbers/active/update.ts)

Note that in order to not mix events, the Nest.js controller is listening on the path `/numbers`, meaning you need to set the callback URL to:

```json
{
  "callbackUrl": "https://your-own-id.ngrok-free.app/numbers"
}
```

Once you received an event, there are 2 things you must do before delegating its handling to a service:
 - `validateAuthenticationHeader()`: Verify the request has not been tampered with. This method will use the `hmacSecret` you cna find with the `numbers.callbacks.get()` action
 - `parseEvent()`: Revive the event: the request body needs to be parsed and revived. In the case of numbers, there is a bug in the backend that doesn't set the timezone for date fields. The SDK method will fix that for you.

You can then safely handle the event. An example is proposed in the [numbers.service.ts](./src/services/numbers.service.ts)

## SMS
SMS callbacks will be triggered when one of the following events happen on a number (short code or long number) associated to an SMS Application:
 - incoming SMS: event type `mo_text`
 - incoming MMS: event type `mo_binary`
 - delivery report for an SMS batch: `delivery_report_sms`
 - delivery report for an MMS batch: `delivery_report_mms`

Configuring a callback URL must be done in the [Dashboard](https://dashboard.sinch.com/sms/api/services): select your Application and scroll to the section called "Callback URLs"

Note that in order to not mix events, the Nest.js controller is listening on the path `/sms`, meaning you need to set the callback URL to:
```bash
https://your-own-id.ngrok-free.app/sms
```

Once you receive an event, there is 1 thing you must do before delegating its handling to a service (there no request validation for this API):
- `parseEvent()`: Revive the event: the request body needs to be parsed and revived. In the case of SMS API, this method will ensure the event type is valid and revive the `Date` types.

You can then safely handle the event. An example is proposed in the [sms.service.ts](./src/services/sms.service.ts)

## Verification
Verification callbacks will be triggered along the verification flow:
 - `VerificationRequestEvent` when someone starts a verification flow
 - `VerificationResultEvent` when the verification flow is over

To receive such events, you must configure a callback URL for your Application in the [Dashboard](https://dashboard.sinch.com/verification/apps)

Note that in order to not mix events, the Nest.js controller is listening on the path `/verification`, meaning you need to set the callback URL to:
```bash
https://your-own-id.ngrok-free.app/verification
```

Once you received an event, there are 2 things you must do before delegating its handling to a service:
 - `validateAuthenticationHeader()`: Verify the authorization header value to make sure the request has not been tampered with and is intended to your Application (you'll need your application credentials to calculate the signature hash)
 - `parseEvent()`: Revive the event: the request body needs to be parsed and revived. In the case of Verification API, this method will just ensure the event type is valid.

You can then safely handle the event. An example is proposed in the [verification.service.ts](./src/services/verification.service.ts)

## Voice
Voice callbacks will be triggered along a voice flow:
 - `ice`: Incoming Call Event
 - `aca`: Answered Call Event
 - `dice`: Disconnected Call Event
 - `pie`: Prompt Input Event
 - `notify`: Notification event

To receive such events, you must configure a callback URL for your Application in the [Dashboard](https://dashboard.sinch.com/voice/apps)

Note that in order to not mix events, the Nest.js controller is listening on the path `/voice`, meaning you need to set the callback URL to:
```bash
https://your-own-id.ngrok-free.app/voice
```

Once you received an event, there are 2 things you must do before delegating its handling to a service:
- `validateAuthenticationHeader()`: Verify the authorization header value to make sure the request has not been tampered with and is intended to your Application (you'll need your application credentials to calculate the signature hash)
- `parseEvent()`: Revive the event: the request body needs to be parsed and revived. In the case of Voice API, this method will ensure the event type is valid and revive the `Date` types.

You can then safely handle the event. An example is proposed in the [voice.service.ts](./src/services/voice.service.ts)
