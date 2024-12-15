import FormData = require('form-data');
import { sendEmailRequestWithHtml, sendEmailRequestWithTemplate } from './send-email-request.models';
import {
  transformSendEmailRequestIntoApiRequestBody,
} from '../../../../../src/models/v1/emails/request/send-email-request/send-email-request.transform';

describe('SendEmailRequest', () => {

  let appendSpy: any;

  beforeEach(() => {
    appendSpy = jest.spyOn(FormData.prototype, 'append');
  });

  afterEach(() => {
    appendSpy.mockRestore();
  });

  it('should transform a client object using HTML into an API object', () => {
    transformSendEmailRequestIntoApiRequestBody(sendEmailRequestWithHtml);
    expect(appendSpy).toHaveBeenCalledTimes(30);
    expect(appendSpy).toHaveBeenCalledWith('from', 'from value');
    expect(appendSpy).toHaveBeenCalledWith('to', 'to value');
    expect(appendSpy).toHaveBeenCalledWith('cc', 'cc value');
    expect(appendSpy).toHaveBeenCalledWith('bcc', 'bcc value');
    expect(appendSpy).toHaveBeenCalledWith('subject', 'subject value');
    expect(appendSpy).toHaveBeenCalledWith('text', 'text value');
    expect(appendSpy).toHaveBeenCalledWith('html', 'html value');
    expect(appendSpy).toHaveBeenCalledWith('amp-html', 'amp_html value');
    expect(appendSpy).toHaveBeenCalledWith('attachment', 'attachment value');
    expect(appendSpy).toHaveBeenCalledWith('inline', 'inline value');
    expect(appendSpy).toHaveBeenCalledWith('o:tag', 'tag value');
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip', 'sendingIp value');
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip-pool', 'sendingIpPool value');
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime', 'deliveryTime value');
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime-optimize-period', '24h');
    expect(appendSpy).toHaveBeenCalledWith('o:dkim', 'yes');
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim', 'secondaryDkim value');
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim-public', 'secondaryDkimPublic value');
    expect(appendSpy).toHaveBeenCalledWith('o:require-tls', 'false');
    expect(appendSpy).toHaveBeenCalledWith('o:skip-verification', 'true');
    expect(appendSpy).toHaveBeenCalledWith('o:time-zone-localize', '02:00PM');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking', 'htmlonly');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-clicks', 'htmlonly');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-opens', 'yes');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-pixel-location-top', 'no');
    expect(appendSpy).toHaveBeenCalledWith('o:testmode', 'false');
    expect(appendSpy).toHaveBeenCalledWith('h:X-Mailgun-Sending-Ip-Pool', 'xx.xx.xxx.x');
    expect(appendSpy).toHaveBeenCalledWith('v:first_name', 'John');
    expect(appendSpy).toHaveBeenCalledWith('v:last_name', 'Smith');
    expect(appendSpy).toHaveBeenCalledWith('v:my_message_id', '123');
  });

  it('should transform a client object using a template into an API object', () => {
    transformSendEmailRequestIntoApiRequestBody(sendEmailRequestWithTemplate);
    expect(appendSpy).toHaveBeenCalledTimes(33);
    expect(appendSpy).toHaveBeenCalledWith('from', 'from value');
    expect(appendSpy).toHaveBeenCalledWith('to', 'to value');
    expect(appendSpy).toHaveBeenCalledWith('cc', 'cc value');
    expect(appendSpy).toHaveBeenCalledWith('bcc', 'bcc value');
    expect(appendSpy).toHaveBeenCalledWith('subject', 'subject value');
    expect(appendSpy).toHaveBeenCalledWith('text', 'text value');
    expect(appendSpy).toHaveBeenCalledWith('template', 'template value');
    expect(appendSpy).toHaveBeenCalledWith('amp-html', 'amp_html value');
    expect(appendSpy).toHaveBeenCalledWith('attachment', 'attachment value');
    expect(appendSpy).toHaveBeenCalledWith('inline', 'inline value');
    expect(appendSpy).toHaveBeenCalledWith('o:tag', 'tag value');
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip', 'sendingIp value');
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip-pool', 'sendingIpPool value');
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime', 'deliveryTime value');
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime-optimize-period', '36h');
    expect(appendSpy).toHaveBeenCalledWith('o:dkim', 'true');
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim', 'secondaryDkim value');
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim-public', 'secondaryDkimPublic value');
    expect(appendSpy).toHaveBeenCalledWith('o:require-tls', 'yes');
    expect(appendSpy).toHaveBeenCalledWith('o:skip-verification', 'no');
    expect(appendSpy).toHaveBeenCalledWith('o:time-zone-localize', '04:15AM');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking', 'yes');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-clicks', 'no');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-opens', 'true');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-pixel-location-top', 'false');
    expect(appendSpy).toHaveBeenCalledWith('o:testmode', 'false');
    expect(appendSpy).toHaveBeenCalledWith('t:text', 'yes');
    expect(appendSpy).toHaveBeenCalledWith('t:version', 'version value');
    expect(appendSpy).toHaveBeenCalledWith('t:variables', 'variables value');
    expect(appendSpy).toHaveBeenCalledWith('h:X-Mailgun-Sending-Ip-Pool', 'xx.xx.xxx.x');
    expect(appendSpy).toHaveBeenCalledWith('v:first_name', 'John');
    expect(appendSpy).toHaveBeenCalledWith('v:last_name', 'Smith');
    expect(appendSpy).toHaveBeenCalledWith('v:my_message_id', '123');
  });

});
