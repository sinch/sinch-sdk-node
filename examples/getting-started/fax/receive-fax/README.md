# Sinch Getting started

This code is related to [Handle an incoming fax with Node.js](https://developers.sinch.com/docs/fax/getting-started/node/receive-fax).

## Configuration

Rename the [.env.example](.env.example) file into `.env` and edit it to set the parameters that will be used to configure the Express server and the controller.

### Server port

- `PORT`: the port to be used to listen to incoming requests. Default is `3001` if not set.

### API credentials

- You need to fill the following variables with the values from your Sinch account:
    - `SINCH_PROJECT_ID`= Your Sinch Project ID
    - `SINCH_KEY_ID`= Your Sinch Access Key ID
    - `SINCH_KEY_SECRET`= Your Sinch Key Secret associated to your Sinch Access Key

## Usage — Starting the server

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own parameters (see the paragraph above for details).
3. Run the code with one of the following commands:
- `npm start`
- `node src/server.js`
