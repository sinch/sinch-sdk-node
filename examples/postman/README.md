# Sinch Node SDK — Postman collection

Postman collection that mirrors the REST endpoints exposed by the [Sinch Node.js SDK](https://github.com/sinch/sinch-sdk-node) packages. Use it to call the live APIs documented at [developers.sinch.com](https://developers.sinch.com/).

## Files

| File | Purpose |
|------|---------|
| `generated/sinch-node-sdk.postman_collection.json` | All SDK endpoints, grouped by package (generated, not committed) |
| `generated/sinch-node-sdk.postman_environment.json` | Hostnames and credential placeholders (generated, not committed) |
| `generate-collection.mjs` | Regenerates the collection and environment |

## Import into Postman

1. Generate the Postman files:

   ```bash
   node examples/postman/generate-collection.mjs
   ```

2. Open Postman → **Import**
3. Import both files from `generated/`:
   - `sinch-node-sdk.postman_collection.json`
   - `sinch-node-sdk.postman_environment.json`
4. Select the **Sinch Node SDK — Production** environment
5. Fill in your credentials (see below)

## Credentials

Get project credentials from the [Sinch dashboard](https://dashboard.sinch.com/settings/access-keys).

### OAuth2 (Fax, SMS, Conversation, Numbers, Number Lookup, Elastic SIP Trunking)

| Variable | Maps from `.env` |
|----------|------------------|
| `projectId` | `SINCH_PROJECT_ID` |
| `keyId` | `SINCH_KEY_ID` |
| `keySecret` | `SINCH_KEY_SECRET` |

**Before other requests:** run **Auth — OAuth2 token** once. Postman sends Basic auth automatically from `keyId` + `keySecret` (same as the SDK). The test script stores `accessToken`.

You do **not** need to set `basicAuthEncoded` manually.

### Application signing (Voice, Verification)

| Variable | Value |
|----------|-------|
| `applicationKey` | Voice / Verification app key |
| `applicationSecret` | App secret |

Folder pre-request scripts set `authMode=application` and sign each request (`x-timestamp` + `Authorization: Application …`).

### SMS API token (alternative to OAuth2)

The SDK also supports `servicePlanId` + `apiToken` against `https://{region}.sms.api.sinch.com` (no `zt.` prefix). This collection defaults to OAuth2 (`zt.us.sms.api.sinch.com`). To use API token auth, change `smsHost` and set `Authorization: Bearer {{apiToken}}` manually on SMS requests.

## Regenerate after SDK changes

```bash
node examples/postman/generate-collection.mjs
```

Currently generates **~170** unique HTTP operations and the environment template. Wrapper methods that hit the same URL (e.g. `sendTextMessage` → `messages:send`) are deduplicated to one request per path + method + `Accept` header.

## Regional hosts

Default environment uses US where applicable. Update host variables for other regions:

| Product | US (default) | EU example |
|---------|--------------|------------|
| SMS (OAuth2) | `https://zt.us.sms.api.sinch.com` | `https://zt.eu.sms.api.sinch.com` |
| Conversation | `https://us.conversation.api.sinch.com` | `https://eu.conversation.api.sinch.com` |
| Templates | `https://us.template.api.sinch.com` | `https://eu.template.api.sinch.com` |
| Voice | `https://calling.api.sinch.com` | `https://calling-eu.api.sinch.com` |

Fax, Numbers, Verification, Number Lookup, and Elastic SIP Trunking use global hostnames.

## Tips

- Replace path placeholders (`{{id}}`, `{{serviceId}}`, etc.) before sending.
- POST/PATCH/PUT bodies are `{}` placeholders — fill from [API reference](https://developers.sinch.com/).
- `Faxes.exportList` and `Faxes.list` share the same URL; export uses `Accept: text/csv` and `format=csv` query param.
- `Faxes.send` may use `multipart/form-data` in production; switch body mode in Postman when testing file upload.
