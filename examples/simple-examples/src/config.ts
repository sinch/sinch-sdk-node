import { getRegion, SinchClient, Region } from '@sinch/sdk-core';
require('dotenv').config();

export const initClient = () => {
  const keyId = process.env.SINCH_KEY_ID || '';
  const keySecret = process.env.SINCH_KEY_SECRET || '';
  const projectId = process.env.SINCH_PROJECT_ID || '';
  return new SinchClient({ projectId, keyId, keySecret });
};

export const initSmsClient = () => {
  const servicePlanId = process.env.SINCH_SERVICE_PLAN_ID || '';
  const apiToken = process.env.SINCH_API_TOKEN || '';
  const region = getRegion(process.env.SMS_REGION) || Region.UNITED_STATES;
  return new SinchClient({ servicePlanId, apiToken, region });
};

export const initApplicationClient = () => {
  const applicationKey = process.env.SINCH_APPLICATION_KEY || '';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET || '';
  return new SinchClient({ applicationKey, applicationSecret });
};

export const getPrintFormat = (args: string[]): 'pretty' | 'full' => {
  const params = args.slice(2);
  if (params.length > 0 && params[0] === 'pretty') {
    return 'pretty';
  }
  return 'full';
};

export const getPhoneNumberFromConfig = (): string => {
  return readVariable('PHONE_NUMBER');
};

export const getNumberCallbackUrlFromConfig= (): string => {
  return readVariable('NUMBER_CALLBACK_URL');
};

export const readServicePlanId = (): string | undefined => {
  return process.env.SINCH_SERVICE_PLAN_ID;
};

export const readApplicationKey = (): string | undefined => {
  return process.env.SINCH_APPLICATION_KEY;
};

export const getServicePlanIdFromConfig = (): string => {
  return readVariable('SINCH_SERVICE_PLAN_ID');
};

export const getApplicationKeyFromConfig = (): string => {
  return readVariable('SINCH_APPLICATION_KEY');
};

export const getGroupIdFromConfig = (): string => {
  return readVariable('GROUP_ID');
};

export const getRecipientPhoneNumberFromConfig = (): string => {
  return readVariable('RECIPIENT_PHONE_NUMBER');
};

export const getBatchIdFromConfig = (): string => {
  return readVariable('BATCH_ID');
};

export const getInboundIdFromConfig = (): string => {
  return readVariable('INBOUND_ID');
};

export const getHmacSecretFromConfig = (): string => {
  return readVariable('HMAC_SECRET');
};

export const getVerificationIdFromConfig = (): string => {
  return readVariable('VERIFICATION_ID');
};

export const getVerificationIdentityFromConfig = (): string => {
  return readVariable('VERIFICATION_IDENTITY');
};

export const getVerificationReferenceFromConfig = (): string => {
  return readVariable('VERIFICATION_REFERENCE');
};

export const getVerificationCodeFromConfig = (): string => {
  return readVariable('VERIFICATION_CODE');
};

export const getVerificationCliFromConfig = (): string => {
  return readVariable('VERIFICATION_CLI');
};

export const getCallIdFromConfig = (): string => {
  return readVariable('CALL_ID');
};

export const getConferenceIdFromConfig = (): string => {
  return readVariable('CONFERENCE_ID');
};

export const getVoiceCallBackUrl = (): string => {
  return readVariable('VOICE_CALLBACK_URL');
};

export const getAppIdFromConfig = () => {
  return readVariable('CONVERSATION_APP_ID');
};

export const getContactIdFromConfig = () => {
  return readVariable('CONVERSATION_CONTACT_ID');
};

export const getMessengerTokenFormConfig = () => {
  return readVariable('MESSENGER_TOKEN');
};

export const getMessengerUserIdFromConfig = () => {
  return readVariable('MESSENGER_USER_ID');
};

export const getConversationIdFromConfig = () => {
  return readVariable('CONVERSATION_ID');
};

export const getMessageIdFromConfig = () => {
  return readVariable('MESSAGE_ID');
};

export const getWebhookIdFromConfig = () => {
  return readVariable('WEBHOOK_ID');
};

export const getWebhookTargetFromConfig = () => {
  return readVariable('WEBHOOK_TARGET');
};

export const getTemplateIdFromConfig = () => {
  return readVariable('TEMPLATE_ID');
};

export const getEventIdFromConfig = () => {
  return readVariable('EVENT_ID');
};

const readVariable = ( name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`No "${name}" has been provided. Please update your .env file.`);
  }
  return value;
};

export const printFullResponse = (response: any) => {
  console.log(JSON.stringify(response, null, 2));
};
