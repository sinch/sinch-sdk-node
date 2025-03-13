import { SendEmailHtmlInTemplateRequest } from '../send-email-html-in-template-request';
import { SendEmailHtmlInlineRequest } from '../send-email-html-inline-request';

export type SendEmailRequest = SendEmailHtmlInlineRequest | SendEmailHtmlInTemplateRequest;
