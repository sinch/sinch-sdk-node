# Sinch Getting started: Make a Call (Node.js)

This code is related to [Make a call with the Node.js SDK](https://developers.sinch.com/docs/voice/getting-started/node-sdk/make-call).

## Configuration

Rename the [.env.example](.env.example) file into `.env` and edit it to set the credentials that will be used to configure the Sinch Client.
- You need to fill the following variables with the values from your [Sinch account](https://dashboard.sinch.com/voice/apps):
    - `SINCH_APPLICATION_KEY`= Your Sinch Voice Application Key
    - `SINCH_APPLICATION_SECRET`= Your Sinch Application Secret

## Usage

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own credentials (see the paragraph above for details).
3. Run the code with one of the following commands:
- `npm start`
- `node src/app.js`
