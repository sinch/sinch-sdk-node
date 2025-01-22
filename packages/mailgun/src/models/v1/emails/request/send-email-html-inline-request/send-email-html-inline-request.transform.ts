import { SendEmailHtmlInlineRequest } from './send-email-html-inline-request';
import { appendSerializedMapToFormData } from '../helpers';
import { appendOverridePropertiesToFormData } from '../override-properties/override-properties.transform';
import { appendCustomDataToFormData } from '../helpers';
import { appendArrayToFormData } from '../helpers';
import FormData = require('form-data');

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformSendEmailHtmlInlineRequestIntoApiRequestBody = (
  sdkRequest: SendEmailHtmlInlineRequest,
): FormData => {
  const formData = new FormData();
  if (sdkRequest['to'] != null) {
    appendArrayToFormData(sdkRequest['to'], 'to', formData);
  }
  if (sdkRequest['from'] != null) {
    formData.append('from', sdkRequest['from']);
  }
  if (sdkRequest['cc'] != null) {
    appendArrayToFormData(sdkRequest['cc'], 'cc', formData);
  }
  if (sdkRequest['bcc'] != null) {
    appendArrayToFormData(sdkRequest['bcc'], 'bcc', formData);
  }
  if (sdkRequest['subject'] != null) {
    formData.append('subject', sdkRequest['subject']);
  }
  if (sdkRequest['text'] != null) {
    formData.append('text', sdkRequest['text']);
  }
  if (sdkRequest['ampHtml'] != null) {
    formData.append('amp-html', sdkRequest['ampHtml']);
  }
  if (sdkRequest['attachment'] != null) {
    appendArrayToFormData(sdkRequest['attachment'], 'attachment', formData);
  }
  if (sdkRequest['inline'] != null) {
    appendArrayToFormData(sdkRequest['inline'], 'inline', formData);
  }
  if (sdkRequest['recipientVariables'] != null) {
    appendSerializedMapToFormData(sdkRequest['recipientVariables'], 'recipient-variables', formData);
  }
  if (sdkRequest['overrideProperties'] != null) {
    appendOverridePropertiesToFormData(sdkRequest['overrideProperties'], formData);
  }
  if (sdkRequest['customVariables'] != null) {
    appendCustomDataToFormData(sdkRequest['customVariables'], 'v:', formData);
  }
  if (sdkRequest['customHeaders'] != null) {
    appendCustomDataToFormData(sdkRequest['customHeaders'], 'h:', formData);
  }
  if (sdkRequest['html'] != null) {
    formData.append('html', sdkRequest['html']);
  }
  return formData;
};
