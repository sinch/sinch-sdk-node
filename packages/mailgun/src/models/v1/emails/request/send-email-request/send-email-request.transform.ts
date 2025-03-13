import { SendEmailRequest } from './send-email-request';
import { SendEmailHtmlInTemplateRequest } from '../send-email-html-in-template-request';
import { transformSendEmailHtmlInTemplateRequestIntoApiRequestBody } from '../send-email-html-in-template-request/send-email-html-in-template-request.transform';
import { SendEmailHtmlInlineRequest } from '../send-email-html-inline-request';
import { transformSendEmailHtmlInlineRequestIntoApiRequestBody } from '../send-email-html-inline-request/send-email-html-inline-request.transform';
import FormData = require('form-data');

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformSendEmailRequestIntoApiRequestBody = (sdkRequest: SendEmailRequest): FormData => {
  if ((sdkRequest as SendEmailHtmlInTemplateRequest).template != null) {
    return transformSendEmailHtmlInTemplateRequestIntoApiRequestBody(sdkRequest as SendEmailHtmlInTemplateRequest);
  }
  return transformSendEmailHtmlInlineRequestIntoApiRequestBody(sdkRequest as SendEmailHtmlInlineRequest);
};
