import { appendOverridePropertiesToFormData } from '../override-properties/override-properties.transform';
import { appendTemplatePropertiesToFormData } from '../template-properties/template-properties.transform';
import { appendFilteredPropertiesToFormData } from '../helper';
import { SendEmailRequest } from './send-email-request';
import FormData = require('form-data');

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformSendEmailRequestIntoApiRequestBody = (sdkRequest: SendEmailRequest): FormData => {
  const formData = new FormData();
  if (sdkRequest.html != null) {
    formData.append('html', sdkRequest.html);
  }
  if (sdkRequest.ampHtml != null) {
    formData.append('amp-html', sdkRequest['ampHtml']);
  }
  if (sdkRequest.text!= null) {
    formData.append('text', sdkRequest.text);
  }
  if (sdkRequest.to != null) {
    formData.append('to', sdkRequest.to);
  }
  if (sdkRequest.from != null) {
    formData.append('from', sdkRequest.from);
  }
  if (sdkRequest.cc != null) {
    formData.append('cc', sdkRequest.cc);
  }
  if (sdkRequest.bcc != null) {
    formData.append('bcc', sdkRequest.bcc);
  }
  if (sdkRequest.subject != null) {
    formData.append('subject', sdkRequest.subject);
  }
  if (sdkRequest.attachment != null) {
    formData.append('attachment', sdkRequest.attachment);
  }
  if (sdkRequest.inline != null) {
    formData.append('inline', sdkRequest.inline);
  }
  if (sdkRequest.overrideProperties != null) {
    appendOverridePropertiesToFormData(sdkRequest.overrideProperties, formData);
  }
  if (sdkRequest.template != null) {
    formData.append('template', sdkRequest.template);
  }
  if (sdkRequest.templateProperties != null) {
    appendTemplatePropertiesToFormData(sdkRequest.templateProperties, formData);
  }
  appendFilteredPropertiesToFormData(sdkRequest, 'h:', formData);
  appendFilteredPropertiesToFormData(sdkRequest, 'v:', formData);
  return formData;
};
