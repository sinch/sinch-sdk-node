import { Sms, SmsCallbackWebhooks } from '../../../../src';

describe('SMS Callback Webhook', () => {
  let callbackWebhooks: SmsCallbackWebhooks;

  const DATE_AS_STRING = '2024-01-10T08:49:58.429Z';
  const DATE_AS_DATE = new Date(DATE_AS_STRING);

  beforeEach(() => {
    callbackWebhooks = new SmsCallbackWebhooks();
  });


  it('should not throw an error when parsing the \'mo_text\' event', () => {
    const payload = {
      id: '01XXXXX21XXXXX119Z8P1XXXXX',
      type:  'mo_text',
      from: '16051234567',
      to: '13185551234',
      body: 'This is the SMS body',
      operator_id: 'operator',
      sent_at: DATE_AS_STRING,
      received_at: DATE_AS_STRING,
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult: Sms.MOText = parsedResultFunction() as Sms.MOText;
    expect(parsedResult.sent_at).toStrictEqual(DATE_AS_DATE);
    expect(parsedResult.received_at).toStrictEqual(DATE_AS_DATE);
  });

  it('should not throw an error when parsing the \'mo_binary\' event', () => {
    const payload = {
      id: '01XXXXX21XXXXX119Z8P1XXXXX',
      type:  'mo_binary',
      from: '16051234567',
      to: '13185551234',
      body: 'VGhpcyBpcyB0aGUgU01TIGJvZHk=',
      udh: '5573657244617461486561646572',
      operator_id: 'operator',
      sent_at: DATE_AS_STRING,
      received_at: DATE_AS_STRING,
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult: Sms.MOBinary = parsedResultFunction() as Sms.MOBinary;
    expect(parsedResult.sent_at).toStrictEqual(DATE_AS_DATE);
    expect(parsedResult.received_at).toStrictEqual(DATE_AS_DATE);
  });

  it('should not throw an error when parsing the \'mo_media\' event', () => {
    const payload = {
      id: '01XXXXX21XXXXX119Z8P1XXXXX',
      type:  'mo_media',
      from: '16051234567',
      to: '13185551234',
      body: {
        subject: 'This is the subject',
        message: 'This is the message',
        media: [
          {
            url: 'https://some.s3.example.com/inbounds/image.png',
            code: 1,
            content_type: 'image/png',
            status: 'Failed',
          },
        ],
      },
      sent_at: DATE_AS_STRING,
      received_at: DATE_AS_STRING,
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult: Sms.MOText = parsedResultFunction() as Sms.MOText;
    expect(parsedResult.sent_at).toStrictEqual(DATE_AS_DATE);
    expect(parsedResult.received_at).toStrictEqual(DATE_AS_DATE);
  });

  it('should not throw an error when parsing the \'delivery_report_sms\' event', () => {
    const payload = {
      type:  'delivery_report_sms',
      batch_id: 'batch_id_value',
      total_message_count: 1,
      statuses: [
        {
          code: 0,
          count: 1,
          recipients: [
            '+1234567890',
          ],
          status: 'Delivered',
        },
      ],
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should not throw an error when parsing the \'delivery_report_mms\' event', () => {
    const payload = {
      type:  'delivery_report_mms',
      batch_id: 'batch_id_value',
      total_message_count: 1,
      statuses: [
        {
          code: 0,
          count: 1,
          recipients: [
            '+1234567890',
          ],
          status: 'Delivered',
        },
      ],
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should not throw an error when parsing the \'recipient_delivery_report_sms\' event', () => {
    const payload = {
      type:  'recipient_delivery_report_sms',
      batch_id: 'batch_id_value',
      at: DATE_AS_STRING,
      code: 0,
      recipient: '+1234567890',
      status: 'Delivered',
      operator_status_at: DATE_AS_STRING,
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult: Sms.RecipientDeliveryReport = parsedResultFunction() as Sms.RecipientDeliveryReport;
    expect(parsedResult.at).toStrictEqual(DATE_AS_DATE);
    expect(parsedResult.operator_status_at).toStrictEqual(DATE_AS_DATE);
  });

  it('should not throw an error when parsing the \'recipient_delivery_report_mms\' event', () => {
    const payload = {
      type:  'recipient_delivery_report_mms',
      batch_id: 'batch_id_value',
      at: DATE_AS_STRING,
      code: 0,
      recipient: '+1234567890',
      status: 'Delivered',
      operator_status_at: DATE_AS_STRING,
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).not.toThrow();
    const parsedResult: Sms.RecipientDeliveryReport = parsedResultFunction() as Sms.RecipientDeliveryReport;
    expect(parsedResult.at).toStrictEqual(DATE_AS_DATE);
    expect(parsedResult.operator_status_at).toStrictEqual(DATE_AS_DATE);
  });

  it('should throw an error when parsing a random object', () => {
    const payload = {
      unknownProperty: 'anyValue',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).toThrow(`Unknown SMS event: {"unknownProperty":"anyValue"}`);
  });

  it('should throw an error when parsing a non-existing event type', () => {
    const payload = {
      type: 'unknown',
    };
    const parsedResultFunction = () => callbackWebhooks.parseEvent(payload);
    expect(parsedResultFunction).toThrow('Unknown SMS event type: unknown');
  });

});
