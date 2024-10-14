import {
  AUTH_HOSTNAME,
  CONVERSATION_HOSTNAME,
  CONVERSATION_TEMPLATES_HOSTNAME,
  ELASTIC_SIP_TRUNKING_HOSTNAME,
  FAX_HOSTNAME,
  NUMBERS_HOSTNAME,
  formatRegionalizedHostname,
  SMS_HOSTNAME,
  VERIFICATION_HOSTNAME,
  VOICE_APPLICATION_MANAGEMENT_HOSTNAME,
  VOICE_HOSTNAME,
  MAILGUN_HOSTNAME,
} from '../../src';

describe('Domain Helper', () => {

  it('should format the hostname with the given region', () => {
    const formattedConversationHostname = formatRegionalizedHostname(CONVERSATION_HOSTNAME, 'bzh.');
    expect(formattedConversationHostname).toBe('https://bzh.conversation.api.sinch.com');

    const formattedConversationTemplatesHostname = formatRegionalizedHostname(CONVERSATION_TEMPLATES_HOSTNAME, 'bzh.');
    expect(formattedConversationTemplatesHostname).toBe('https://bzh.template.api.sinch.com');

    const formattedFaxHostname = formatRegionalizedHostname(FAX_HOSTNAME, 'bzh.');
    expect(formattedFaxHostname).toBe('https://bzh.fax.api.sinch.com');

    const formattedSmsHostname = formatRegionalizedHostname(SMS_HOSTNAME, 'bzh.');
    expect(formattedSmsHostname).toBe('https://bzh.sms.api.sinch.com');

    const formattedVoiceHostname = formatRegionalizedHostname(VOICE_HOSTNAME, '-bzh');
    expect(formattedVoiceHostname).toBe('https://calling-bzh.api.sinch.com');

    const formattedMailgunHostname = formatRegionalizedHostname(MAILGUN_HOSTNAME, 'bzh.');
    expect(formattedMailgunHostname).toBe('https://api.bzh.mailgun.net');
  });

  it('should leave the hostname untouched', () => {
    const formattedAuthHostname = formatRegionalizedHostname(AUTH_HOSTNAME, 'bzh');
    expect(formattedAuthHostname).toBe(AUTH_HOSTNAME);

    const formattedElasticSipTrunkingHostname = formatRegionalizedHostname(ELASTIC_SIP_TRUNKING_HOSTNAME, 'bzh');
    expect(formattedElasticSipTrunkingHostname).toBe(ELASTIC_SIP_TRUNKING_HOSTNAME);

    const formattedNumbersHostname = formatRegionalizedHostname(NUMBERS_HOSTNAME, 'bzh');
    expect(formattedNumbersHostname).toBe(NUMBERS_HOSTNAME);

    const formattedVerificationHostname = formatRegionalizedHostname(VERIFICATION_HOSTNAME, 'bzh');
    expect(formattedVerificationHostname).toBe(VERIFICATION_HOSTNAME);

    const formattedVoiceAppMgmtHostname = formatRegionalizedHostname(VOICE_APPLICATION_MANAGEMENT_HOSTNAME, 'bzh');
    expect(formattedVoiceAppMgmtHostname).toBe(VOICE_APPLICATION_MANAGEMENT_HOSTNAME);
  });

});
