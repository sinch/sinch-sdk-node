# Sinch Getting started

This code is related to [Send an SMS Message with Node.js SDK](https://developers.sinch.com/docs/sms/getting-started/node-sdk/send-message).

## Configuration

Rename the [.env.example](.env.example) file into `.env` and edit it to set the credentials that will be used to configure the Sinch Client.
- You need to fill the following variables with the values from your Sinch account:
    - `SINCH_PROJECT_ID`= Your Sinch Project ID
    - `SINCH_KEY_ID`= Your Sinch Access Key ID
    - `SINCH_KEY_SECRET`= Your Sinch Key Secret associated to your Sinch Access Key
    - `SINCH_SMS_REGION`= The SMS region of your Service plan (e.g. `us`, `eu`)

## Usage

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own credentials (see the paragraph above for details).
3. Run the code with one of the following commands:
- `npm start`
- `node src/app.js`
