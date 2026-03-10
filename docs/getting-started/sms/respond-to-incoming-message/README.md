# Sinch Getting started

This code is related to [Receive an SMS Message with Node.js SDK](https://developers.sinch.com/docs/sms/getting-started/node-sdk/handle-incoming/).

## Configuration

Rename the [.env.example](.env.example) file into `.env` and edit it to set the parameters that will be used to configure the Express server and the controller.

### Server port

- `PORT`: the port to be used to listen to incoming requests. Default is `3001` if not set.

### Controller Configuration
- The webhook event sent by Sinch may contain a signature in the header to verify the authenticity of the request.
    - `WEBHOOKS_SECRET`= The secret value to validate the header signature.

### API credentials to send a SMS
- You need to fill the following variables with the values from your Sinch account:
    - `SINCH_PROJECT_ID`= Your Sinch Project ID
    - `SINCH_KEY_ID`= Your Sinch Access Key ID
    - `SINCH_KEY_SECRET`= Your Sinch Key Secret associated to your Sinch Access Key
    - `SINCH_SMS_REGION`= The SMS region of your Service plan (e.g. `us`, `eu`)

## Usage — Starting the server

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own parameters (see the paragraph above for details).
3. Run the code with one of the following commands:
- `npm start`
- `node src/server.js`
