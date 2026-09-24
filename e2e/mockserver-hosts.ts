/**
 * Temporary e2e mockserver hostnames (DEVEXP-1593).
 * Defaults to the hosted mockserver. Override with SINCH_MOCKSERVER_BASE if needed.
 *
 * The hosted server prefixes every expectation with /<domain>. Verification SDK
 * paths already start with /verification/v1, so the client hostname must be
 * ${base}/verification (public URL /verification/verification/v1/...). The site
 * root 301-loops. Webhook fixtures are fetched at
 * ${base}/verification/webhooks/verification/...
 */
const DEFAULT_BASE = 'https://sinch-sdk-mockserver.sliplane.app';

const base = (process.env.SINCH_MOCKSERVER_BASE || DEFAULT_BASE).replace(/\/$/, '');

export const mockserverHosts = {
  authHostname: `${base}/authentication`,
  faxHostname: `${base}/fax`,
  numbersHostname: `${base}/numbers`,
  conversationHostname: `${base}/conversation`,
  conversationTemplatesHostname: `${base}/conversation-templates`,
  elasticSipTrunkingHostname: `${base}/elastic-sip-trunking`,
  smsHostname: `${base}/sms`,
  /** SDK paths are /verification/v1/...; the mockserver adds another /verification prefix. */
  verificationHostname: `${base}/verification`,
  /** Mockserver route prefix for webhook fixture fetches */
  verificationWebhooksHostname: `${base}/verification`,
  voiceHostname: `${base}/voice`,
  voiceV2Hostname: `${base}/voice-v2`,
  voiceApplicationManagementHostname: `${base}/voice-application-management`,
  numberLookupHostname: `${base}/number-lookup`,
  provisioningHostname: `${base}/provisioning`,
} as const;
