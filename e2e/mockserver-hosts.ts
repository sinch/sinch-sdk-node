/**
 * Temporary e2e mockserver hostnames (DEVEXP-1593).
 * Defaults to the hosted mockserver. Override with SINCH_MOCKSERVER_BASE if needed.
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
  verificationHostname: `${base}/verification`,
  voiceHostname: `${base}/voice`,
  voiceApplicationManagementHostname: `${base}/voice-application-management`,
  numberLookupHostname: `${base}/number-lookup`,
  provisioningHostname: `${base}/provisioning`,
} as const;
