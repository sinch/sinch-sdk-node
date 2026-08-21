/**
 * Temporary e2e mockserver hostnames (DEVEXP-1593).
 * Default: hosted mockserver. Override with SINCH_MOCKSERVER_BASE for local Docker.
 *
 * Note: verificationHostname is the site root (not .../verification) because SDK
 * paths already start with /verification/v1/.... Webhook fixtures use
 * verificationWebhooksHostname (.../verification/webhooks/...).
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
  /** SDK client hostname — paths already include /verification/v1 */
  verificationHostname: base,
  /** Mockserver route prefix for webhook fixture fetches */
  verificationWebhooksHostname: `${base}/verification`,
  voiceHostname: `${base}/voice`,
  voiceApplicationManagementHostname: `${base}/voice-application-management`,
  numberLookupHostname: `${base}/number-lookup`,
  provisioningHostname: `${base}/provisioning`,
} as const;
