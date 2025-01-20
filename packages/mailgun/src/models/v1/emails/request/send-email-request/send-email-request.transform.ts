import { SendEmailRequest } from './send-email-request';
import FormData = require('form-data');
import { SendEmailHtmlInTemplateRequest } from '../send-email-html-in-template-request';
import { SendEmailHtmlInlineRequest } from '../send-email-html-inline-request';
import {
  transformSendEmailHtmlInTemplateRequestIntoApiRequestBody,
} from '../send-email-html-in-template-request/send-email-html-in-template-request.transform';
import {
  transformSendEmailHtmlInlineRequestIntoApiRequestBody,
} from '../send-email-html-inline-request/send-email-html-inline-request.transform';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformSendEmailRequestIntoApiRequestBody = (sdkRequest: SendEmailRequest): FormData => {
  if ((sdkRequest as SendEmailHtmlInTemplateRequest).template != null) {
    return transformSendEmailHtmlInTemplateRequestIntoApiRequestBody(sdkRequest as SendEmailHtmlInTemplateRequest);
  } else {
    return transformSendEmailHtmlInlineRequestIntoApiRequestBody(sdkRequest as SendEmailHtmlInlineRequest);
  }
};
