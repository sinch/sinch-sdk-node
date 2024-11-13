import FormData = require('form-data');
import { transformSendMimeEmailRequestIntoApiRequestBody } from '../../../../../src/models';
import { sendMimeEmailRequest } from './send-mime-email-request.models';

describe('SendMimeEmailRequest', () => {

  it('should transform a client object using a template into an API object', () => {
    const appendSpy = jest.spyOn(FormData.prototype, 'append');
    transformSendMimeEmailRequestIntoApiRequestBody(sendMimeEmailRequest);
    expect(appendSpy).toHaveBeenCalledTimes(26);
    expect(appendSpy).toHaveBeenCalledWith('to',
      sendMimeEmailRequest.to);
    expect(appendSpy).toHaveBeenCalledWith('template',
      sendMimeEmailRequest.template);
    expect(appendSpy).toHaveBeenCalledWith('o:tag',
      sendMimeEmailRequest.overrideProperties?.tag);
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip',
      sendMimeEmailRequest.overrideProperties?.sendingIp);
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip-pool',
      sendMimeEmailRequest.overrideProperties?.sendingIpPool);
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime',
      sendMimeEmailRequest.overrideProperties?.deliveryTime);
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime-optimize-period',
      sendMimeEmailRequest.overrideProperties?.deliveryTimeOptimizePeriod);
    expect(appendSpy).toHaveBeenCalledWith('o:dkim',
      sendMimeEmailRequest.overrideProperties?.enableDkimSignature);
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim',
      sendMimeEmailRequest.overrideProperties?.secondaryDkim);
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim-public',
      sendMimeEmailRequest.overrideProperties?.secondaryDkimPublic);
    expect(appendSpy).toHaveBeenCalledWith('o:require-tls',
      sendMimeEmailRequest.overrideProperties?.requireTls);
    expect(appendSpy).toHaveBeenCalledWith('o:skip-verification',
      sendMimeEmailRequest.overrideProperties?.skipVerification);
    expect(appendSpy).toHaveBeenCalledWith('o:time-zone-localize',
      sendMimeEmailRequest.overrideProperties?.timeZoneLocalize);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking',
      sendMimeEmailRequest.overrideProperties?.tracking);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-opens',
      sendMimeEmailRequest.overrideProperties?.trackingOpens);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-clicks',
      sendMimeEmailRequest.overrideProperties?.trackingClicks);
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-pixel-location-top',
      sendMimeEmailRequest.overrideProperties?.trackingPixelLocationTop);
    expect(appendSpy).toHaveBeenCalledWith('o:testmode',
      sendMimeEmailRequest.overrideProperties?.isTestMode);
    expect(appendSpy).toHaveBeenCalledWith('t:text',
      sendMimeEmailRequest.templateProperties?.text);
    expect(appendSpy).toHaveBeenCalledWith('t:version',
      sendMimeEmailRequest.templateProperties?.version);
    expect(appendSpy).toHaveBeenCalledWith('t:variables',
      sendMimeEmailRequest.templateProperties?.variables);
    expect(appendSpy).toHaveBeenCalledWith('h:X-Mailgun-Sending-Ip-Pool',
      sendMimeEmailRequest['h:X-Mailgun-Sending-Ip-Pool']);
    expect(appendSpy).toHaveBeenCalledWith('v:first_name',
      sendMimeEmailRequest['v:first_name']);
    expect(appendSpy).toHaveBeenCalledWith('v:last_name',
      sendMimeEmailRequest['v:last_name']);
    expect(appendSpy).toHaveBeenCalledWith('v:my_message_id',
      sendMimeEmailRequest['v:my_message_id']);
  });

});
