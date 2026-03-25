# Sinch Getting started: User Verification Using SMS PIN (Node.js)

Code is related to [Verify a user using SMS PIN with the Node.js SDK](https://developers.sinch.com/docs/verification/getting-started/node-sdk/sms-verification/).

## Configuration

Rename the [.env.example](.env.example) file into `.env` and edit it to set the credentials that will be used to configure the Sinch Client.
- You need to fill the following variables with the values from your [Sinch account](https://dashboard.sinch.com/verification/apps):
    - `SINCH_APPLICATION_KEY`= Your Sinch Voice Application Key
    - `SINCH_APPLICATION_SECRET`= Your Sinch Application Secret

## Usage

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own credentials (see the paragraph above for details).
3. Run the code with one of the following commands:
- `npm start`
- `node src/app.js`
