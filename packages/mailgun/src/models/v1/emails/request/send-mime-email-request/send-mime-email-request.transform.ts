import { appendTemplatePropertiesToFormData } from '../template-properties/template-properties.transform';
import { appendOverridePropertiesToFormData } from '../override-properties/override-properties.transform';
import { appendFilteredPropertiesToFormData } from '../helper';
import { SendMimeEmailRequest } from './send-mime-email-request';
import FormData = require('form-data');

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformSendMimeEmailRequestIntoApiRequestBody = (sdkRequest: SendMimeEmailRequest): FormData => {
  const formData = new FormData();
  if (sdkRequest.to != null) {
    formData.append('to', sdkRequest.to);
  }
  if (sdkRequest.message != null) {
    formData.append('message', sdkRequest.message, { filename: 'MimeMessage' });
  }
  if (sdkRequest.template != null) {
    formData.append('template', sdkRequest['template']);
  }
  if (sdkRequest.templateProperties != null) {
    appendTemplatePropertiesToFormData(sdkRequest.templateProperties, formData);
  }
  if (sdkRequest.overrideProperties != null) {
    appendOverridePropertiesToFormData(sdkRequest.overrideProperties, formData);
  }
  appendFilteredPropertiesToFormData(sdkRequest, 'h:', formData);
  appendFilteredPropertiesToFormData(sdkRequest, 'v:', formData);
  return formData;
};
