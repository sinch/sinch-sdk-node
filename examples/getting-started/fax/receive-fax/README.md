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

### Webhook configuration

When someone sends a fax to your Sinch number, Sinch notifies your application by POSTing an `INCOMING_FAX` event to the **incoming webhook URL** configured on your fax service. For this example to receive and process those events, that URL must point to your running server.

The server listens for incoming requests on `POST /` (at the port defined by `PORT`). Because the server runs on your machine, you need a publicly reachable URL, for example by exposing your local port with a tool such as [ngrok](https://ngrok.com/).

You can configure the incoming webhook URL in either of the following ways:

**Option 1: Automatic update on startup**

Uncomment and set these optional variables in `.env`:

- `SINCH_FAX_SERVICE_ID`: the ID of the fax service to update (found in the [Fax services dashboard](https://dashboard.sinch.com/fax/services))
- `WEBHOOK_URL`: your publicly accessible server URL (e.g.: `https://your-id.ngrok-free.app`)

On startup, the server calls the Fax API to set `incomingWebhookUrl` to `WEBHOOK_URL` and `webhookContentType` to `application/json`, so incoming events are delivered in the format expected by the controller.

**Option 2: Manual update in the dashboard**

1. Go to [Fax services](https://dashboard.sinch.com/fax/services).
2. Edit the fax service associated with your Sinch number.
3. Set **Incoming webhook URL** to your public URL.
4. Save.

### Default fax service

Each Sinch project can have one or more fax services. One service is marked as the **default service** for the project. When you call the Fax API without specifying a `serviceId`, the default service and its configuration are used automatically.

This also applies to webhook behavior: the incoming webhook URL is configured per service, so make sure the service you update (manually or via `SINCH_FAX_SERVICE_ID`) is the one linked to the Sinch number that receives faxes. If you are unsure which service to use, check which one is set as default in the [Fax services dashboard](https://dashboard.sinch.com/fax/services).

## Usage — Starting the server

1. Install the dependencies by running the command `npm install`.
2. Edit the `.env` file with your own parameters (see the paragraph above for details).
3. Run the code with one of the following commands:
- `npm start`
- `node src/server.js`
