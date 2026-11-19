# Getting Started: Call Pacing (Voice API v2)

This code is related to [Call pacing with batch calls](https://developers.sinch.com/docs/voice-2.0/tutorials/call-pacing).

It uses the Voice API v2 through the [Sinch Node.js SDK](https://github.com/sinch/sinch-sdk-node):

- [create_batch.js](create_batch.js) submits a single batch request that queues one call per destination. The calls
  are started at the pace set by `maxCps` (calls per second) and any call not started within `ttlSeconds` expires.
  When a call is answered, it plays a text-to-speech reminder, then hangs up.
- [poll_batch.js](poll_batch.js) polls the batch summary every 5 seconds until all call sessions reach a final state,
  and gives up after 5 minutes.

## Requirements

- [Node.js 18+](https://nodejs.org/)
- [Sinch account](https://dashboard.sinch.com/)
- A Sinch virtual number assigned to a Voice service

## Configuration

1. **Environment variables**  
   Copy [.env.example](.env.example) to `.env` in this directory (or `export` them in your shell), then set:

   - `SINCH_PROJECT_ID`: your Sinch Project ID
   - `SINCH_KEY_ID`: your Sinch Access Key ID
   - `SINCH_KEY_SECRET`: your Sinch Key Secret associated to your Sinch Access Key
   - `SINCH_NUMBER`: the Sinch number used as caller ID, in E.164 format (e.g. `+14045001000`)
   - `DEST_1`, `DEST_2`: the phone numbers to call, in E.164 format (e.g. `+15551110001`)
   - `MAX_CPS` (optional, default `5`): maximum number of calls started per second
   - `TTL_SECONDS` (optional, default `1800`): time in seconds after which queued calls not yet started expire
   - `BATCH_ID`: the `batchId` printed by `create_batch.js`, used by `poll_batch.js`

2. **Install dependencies**  
   From this directory:
   ```bash
   npm install
   ```

## Usage

1. Navigate to this directory:
   ```bash
   cd examples/getting-started/voice/v2/call_pacing
   ```

2. Create the batch:
   ```bash
   node create_batch.js
   ```

3. Set `BATCH_ID` to the `batchId` from the previous output, then poll the batch until it finishes:
   ```bash
   node poll_batch.js
   ```
