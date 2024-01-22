import { parseSmsEventNotification } from '../../../../src';

describe('SMS Callback Webhook', () => {

  it('should not throw an error when parsing the \'mo_text\' event', () => {
    const payload = {
      type:  'mo_text',
      body: 'This is the SMS body',
    };
    const parsedResultFunction = () => parseSmsEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should not throw an error when parsing the \'mo_binary\' event', () => {
    const payload = {
      type:  'mo_binary',
      body: 'VGhpcyBpcyB0aGUgU01TIGJvZHk=',
      udh: '5573657244617461486561646572',
    };
    const parsedResultFunction = () => parseSmsEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
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
    const parsedResultFunction = () => parseSmsEventNotification(payload);
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
    const parsedResultFunction = () => parseSmsEventNotification(payload);
    expect(parsedResultFunction).not.toThrow();
  });

  it('should throw an error when parsing a random object', () => {
    const payload = {
      unknownProperty: 'anyValue',
    };
    const parsedResultFunction = () => parseSmsEventNotification(payload);
    expect(parsedResultFunction).toThrow('Unknown SMS event');
  });

  it('should throw an error when parsing a non-existing event type', () => {
    const payload = {
      type: 'unknown',
    };
    const parsedResultFunction = () => parseSmsEventNotification(payload);
    expect(parsedResultFunction).toThrow('Unknown SMS event type: unknown');
  });

});
