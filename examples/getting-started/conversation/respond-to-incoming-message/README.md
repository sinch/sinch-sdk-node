# Sinch Getting Started: Receive and respond to incoming messages using Conversation API (Node.js)

This code is related to [Receive a message with the Node.js SDK](https://developers.sinch.com/docs/conversation/getting-started#5-handle-incoming-messages).

## Configuration

Rename the [.env.example](.env.example) file into `.env` and edit it to set the credentials that will be used to configure the Express server and the controller.

### Server port

- `PORT`: the port to be used to listen to incoming requests. Default is `3001` if not set.

### API credentials to send a message using the Conversation API
- You need to fill the following variables with the values from your Sinch account:
  - `SINCH_PROJECT_ID`= Your Sinch Project ID
  - `SINCH_KEY_ID`= Your Sinch Access Key ID
  - `SINCH_KEY_SECRET`= Your Sinch Key Secret associated to your Sinch Access Key
  - `SINCH_CONVERSATION_REGION`= The region where is configured your Conversation App ID (e.g. `us`, `eu`)

## Usage — Starting the server

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own parameters (see the paragraph above for details).
3. Run the code with one of the following commands:
- `npm start`
- `node src/server.js`
