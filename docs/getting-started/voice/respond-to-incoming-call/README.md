# Sinch Getting started: Respond to an incoming call with the Node.js SDK

Code is related to [Handle an incoming call with the Node.js SDK](https://developers.sinch.com/docs/voice/getting-started/node-sdk/incoming-call/).

## Configuration

Rename the [.env.example](.env.example) file into `.env` and edit it to set the credentials that will be used to configure the Express server and the controller.

### Server port

- `PORT`: the port to be used to listen to incoming requests. Default is `3001` if not set.

### API credentials to place a voice call
- You need to fill the following variables with the values from your [Sinch account](https://dashboard.sinch.com/voice/apps):
    - `SINCH_APPLICATION_KEY`= Your Sinch Voice Application Key
    - `SINCH_APPLICATION_SECRET`= Your Sinch Application Secret

## Usage

## Usage — Starting the server

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own parameters (see the paragraph above for details).
3. Run the code with one of the following commands:
- `npm start`
- `node src/server.js`
