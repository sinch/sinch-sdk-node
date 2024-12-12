import FormData = require('form-data');
import { transformSendMimeEmailRequestIntoApiRequestBody } from '../../../../../src/models';
import { sendMimeEmailRequest } from './send-mime-email-request.models';

describe('SendMimeEmailRequest', () => {

  it('should transform a client object using a template into an API object', () => {
    const appendSpy = jest.spyOn(FormData.prototype, 'append');
    transformSendMimeEmailRequestIntoApiRequestBody(sendMimeEmailRequest);
    expect(appendSpy).toHaveBeenCalledTimes(26);
    expect(appendSpy).toHaveBeenCalledWith('to', 'to value');
    expect(appendSpy).toHaveBeenCalledWith('template', 'template value');
    expect(appendSpy).toHaveBeenCalledWith('o:tag', 'tag value');
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip', 'sendingIp value');
    expect(appendSpy).toHaveBeenCalledWith('o:sending-ip-pool', 'sendingIpPool value');
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime', 'deliveryTime value');
    expect(appendSpy).toHaveBeenCalledWith('o:deliverytime-optimize-period', '72h');
    expect(appendSpy).toHaveBeenCalledWith('o:dkim', 'false');
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim', 'secondaryDkim value');
    expect(appendSpy).toHaveBeenCalledWith('o:secondary-dkim-public', 'secondaryDkimPublic value');
    expect(appendSpy).toHaveBeenCalledWith('o:require-tls', 'false');
    expect(appendSpy).toHaveBeenCalledWith('o:skip-verification', 'false');
    expect(appendSpy).toHaveBeenCalledWith('o:time-zone-localize', '12:00PM');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking', 'no');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-opens', 'no');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-clicks', 'no');
    expect(appendSpy).toHaveBeenCalledWith('o:tracking-pixel-location-top', 'no');
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
