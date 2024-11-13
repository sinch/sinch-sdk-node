import FormData = require('form-data');
import { transformSendEmailRequestIntoApiRequestBody } from '../../../../../src/models';
import { sendEmailRequestWithHtml, sendEmailRequestWithTemplate } from './send-email-request.models';

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
    expect(appendSpy).toHaveBeenCalledWith('from',
      sendEmailRequestWithHtml.from);
    expect(appendSpy).toHaveBeenCalledWith('to',
      sendEmailRequestWithHtml.to);
    expect(appendSpy).toHaveBeenCalledWith('cc',
      sendEmailRequestWithHtml.cc);
    expect(appendSpy).toHaveBeenCalledWith('bcc',
      sendEmailRequestWithHtml.bcc);
    expect(appendSpy).toHaveBeenCalledWith('subject',
      sendEmailRequestWithHtml.subject);
    expect(appendSpy).toHaveBeenCalledWith('text',
      sendEmailRequestWithHtml.text);
    expect(appendSpy).toHaveBeenCalledWith('html',
      sendEmailRequestWithHtml.html);
    expect(appendSpy).toHaveBeenCalledWith('amp-html',
      sendEmailRequestWithHtml.amp_html);
    expect(appendSpy).toHaveBeenCalledWith('attachment',
      sendEmailRequestWithHtml.attachment);
    expect(appendSpy).toHaveBeenCalledWith('inline',
      sendEmailRequestWithHtml.inline);
    expect(appendSpy).toHaveBeenCalledWith('o:tag',
      sendEmailRequestWithHtml.overrideProperties?.tag);
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip',
      sendEmailRequestWithHtml.overrideProperties?.sendingIp);
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip-pool',
      sendEmailRequestWithHtml.overrideProperties?.sendingIpPool);
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime',
      sendEmailRequestWithHtml.overrideProperties?.deliveryTime);
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime-optimize-period',
      sendEmailRequestWithHtml.overrideProperties?.deliveryTimeOptimizePeriod);
    expect(appendSpy).toHaveBeenCalledWith('o:dkim',
      sendEmailRequestWithHtml.overrideProperties?.enableDkimSignature);
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim',
      sendEmailRequestWithHtml.overrideProperties?.secondaryDkim);
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim-public',
      sendEmailRequestWithHtml.overrideProperties?.secondaryDkimPublic);
    expect(appendSpy).toHaveBeenCalledWith('o:require-tls',
      sendEmailRequestWithHtml.overrideProperties?.requireTls);
    expect(appendSpy).toHaveBeenCalledWith('o:skip-verification',
      sendEmailRequestWithHtml.overrideProperties?.skipVerification);
    expect(appendSpy).toHaveBeenCalledWith('o:time-zone-localize',
      sendEmailRequestWithHtml.overrideProperties?.timeZoneLocalize);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking',
      sendEmailRequestWithHtml.overrideProperties?.tracking);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-opens',
      sendEmailRequestWithHtml.overrideProperties?.trackingOpens);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-clicks',
      sendEmailRequestWithHtml.overrideProperties?.trackingClicks);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-pixel-location-top',
      sendEmailRequestWithHtml.overrideProperties?.trackingPixelLocationTop);
    expect(appendSpy).toHaveBeenCalledWith('o:testmode',
      sendEmailRequestWithHtml.overrideProperties?.isTestMode);
    expect(appendSpy).toHaveBeenCalledWith('h:X-Mailgun-Sending-Ip-Pool',
      sendEmailRequestWithHtml['h:X-Mailgun-Sending-Ip-Pool']);
    expect(appendSpy).toHaveBeenCalledWith('v:first_name',
      sendEmailRequestWithHtml['v:first_name']);
    expect(appendSpy).toHaveBeenCalledWith('v:last_name',
      sendEmailRequestWithHtml['v:last_name']);
    expect(appendSpy).toHaveBeenCalledWith('v:my_message_id',
      sendEmailRequestWithHtml['v:my_message_id']);
  });

  it('should transform a client object using a template into an API object', () => {
    transformSendEmailRequestIntoApiRequestBody(sendEmailRequestWithTemplate);
    expect(appendSpy).toHaveBeenCalledTimes(33);
    expect(appendSpy).toHaveBeenCalledWith('from',
      sendEmailRequestWithTemplate.from);
    expect(appendSpy).toHaveBeenCalledWith('to',
      sendEmailRequestWithTemplate.to);
    expect(appendSpy).toHaveBeenCalledWith('cc',
      sendEmailRequestWithTemplate.cc);
    expect(appendSpy).toHaveBeenCalledWith('bcc',
      sendEmailRequestWithTemplate.bcc);
    expect(appendSpy).toHaveBeenCalledWith('subject',
      sendEmailRequestWithTemplate.subject);
    expect(appendSpy).toHaveBeenCalledWith('text',
      sendEmailRequestWithTemplate.text);
    expect(appendSpy).toHaveBeenCalledWith('template',
      sendEmailRequestWithTemplate.template);
    expect(appendSpy).toHaveBeenCalledWith('amp-html',
      sendEmailRequestWithTemplate.amp_html);
    expect(appendSpy).toHaveBeenCalledWith('attachment',
      sendEmailRequestWithTemplate.attachment);
    expect(appendSpy).toHaveBeenCalledWith('inline',
      sendEmailRequestWithTemplate.inline);
    expect(appendSpy).toHaveBeenCalledWith('o:tag',
      sendEmailRequestWithTemplate.overrideProperties?.tag);
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip',
      sendEmailRequestWithTemplate.overrideProperties?.sendingIp);
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip-pool',
      sendEmailRequestWithTemplate.overrideProperties?.sendingIpPool);
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime',
      sendEmailRequestWithTemplate.overrideProperties?.deliveryTime);
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime-optimize-period',
      sendEmailRequestWithTemplate.overrideProperties?.deliveryTimeOptimizePeriod);
    expect(appendSpy).toHaveBeenCalledWith('o:dkim',
      sendEmailRequestWithTemplate.overrideProperties?.enableDkimSignature);
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim',
      sendEmailRequestWithTemplate.overrideProperties?.secondaryDkim);
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim-public',
      sendEmailRequestWithTemplate.overrideProperties?.secondaryDkimPublic);
    expect(appendSpy).toHaveBeenCalledWith('o:require-tls',
      sendEmailRequestWithTemplate.overrideProperties?.requireTls);
    expect(appendSpy).toHaveBeenCalledWith('o:skip-verification',
      sendEmailRequestWithTemplate.overrideProperties?.skipVerification);
    expect(appendSpy).toHaveBeenCalledWith('o:time-zone-localize',
      sendEmailRequestWithTemplate.overrideProperties?.timeZoneLocalize);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking',
      sendEmailRequestWithTemplate.overrideProperties?.tracking);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-opens',
      sendEmailRequestWithTemplate.overrideProperties?.trackingOpens);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-clicks',
      sendEmailRequestWithTemplate.overrideProperties?.trackingClicks);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-pixel-location-top',
      sendEmailRequestWithTemplate.overrideProperties?.trackingPixelLocationTop);
    expect(appendSpy).toHaveBeenCalledWith('o:testmode',
      sendEmailRequestWithTemplate.overrideProperties?.isTestMode);
    expect(appendSpy).toHaveBeenCalledWith('t:text',
      sendEmailRequestWithTemplate.templateProperties?.text);
    expect(appendSpy).toHaveBeenCalledWith('t:version',
      sendEmailRequestWithTemplate.templateProperties?.version);
    expect(appendSpy).toHaveBeenCalledWith('t:variables',
      sendEmailRequestWithTemplate.templateProperties?.variables);
    expect(appendSpy).toHaveBeenCalledWith('h:X-Mailgun-Sending-Ip-Pool',
      sendEmailRequestWithTemplate['h:X-Mailgun-Sending-Ip-Pool']);
    expect(appendSpy).toHaveBeenCalledWith('v:first_name',
      sendEmailRequestWithTemplate['v:first_name']);
    expect(appendSpy).toHaveBeenCalledWith('v:last_name',
      sendEmailRequestWithTemplate['v:last_name']);
    expect(appendSpy).toHaveBeenCalledWith('v:my_message_id',
      sendEmailRequestWithTemplate['v:my_message_id']);
  });

});
