import FormData = require('form-data');
import {
  appendArrayToFormData,
  appendCustomDataToFormData,
  appendDeliveryTimeOptimizePeriodToFormData,
} from '../../../../../src/models/v1/emails/request/helpers';
import { OverrideProperties } from '../../../../../src/models';
import { ATTACHMENT_KEY } from '../../../../../src/models/v1/emails/request/helpers-attachments';

describe('Request helpers', () => {
  let formData: FormData;
  let appendSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    formData = new FormData();
    appendSpy = jest.spyOn(formData, 'append');
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    appendSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('appendFilteredPropertiesToFormData', () => {
    it('should append properties with the specified prefix to FormData', () => {
      // Given
      const obj: Record<string, any> = {
        'first_name': 'John',
        'last_name': 'Smith',
        'my_message_id': '123',
        'date1': '2024-06-06T13:42:42Z',
        'date2': new Date('2024-06-06T13:42:42Z'),
      };
      // When
      appendCustomDataToFormData(obj, 'v:', formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(5);
      expect(appendSpy).toHaveBeenCalledWith('v:first_name', 'John');
      expect(appendSpy).toHaveBeenCalledWith('v:last_name', 'Smith');
      expect(appendSpy).toHaveBeenCalledWith('v:my_message_id', '123');
      expect(appendSpy).toHaveBeenCalledWith('v:date1', '2024-06-06T13:42:42Z');
      expect(appendSpy).toHaveBeenCalledWith('v:date2', 'Thu, 06 Jun 2024 13:42:42 GMT');
    });
  });

  describe('appendDeliveryTimeOptimizePeriodToFormData', () => {
    it('should append the deliveryTimeOptimizePeriod property correctly formatted to FormData', () => {
      // Given
      const sdkRequest: OverrideProperties = {
        deliveryTimeOptimizePeriod: 24,
      };
      // When
      appendDeliveryTimeOptimizePeriodToFormData(sdkRequest, formData);
      // Then
      expect(appendSpy).toHaveBeenCalledWith('o:deliverytime-optimize-period', '24h');
    });
  });

  describe('appendArrayToFormData', () => {
    it('should append an array of strings to FormData', () => {
      // Given
      const data = ['first', 'second', 'third'];
      // When
      appendArrayToFormData(data, 'key', formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(3);
      expect(appendSpy).toHaveBeenCalledWith('key', 'first');
      expect(appendSpy).toHaveBeenCalledWith('key', 'second');
      expect(appendSpy).toHaveBeenCalledWith('key', 'third');
    });

    it('should append an array of strings as attachment to FormData', () => {
      // Given
      const data = ['first', 'second', 'third'];
      // When
      appendArrayToFormData(data, ATTACHMENT_KEY, formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(3);
      expect(appendSpy).toHaveBeenCalledWith(ATTACHMENT_KEY,
        Buffer.from('first'),
        { contentType: undefined, filename: 'file', knownLength: undefined },
      );
      expect(appendSpy).toHaveBeenCalledWith(ATTACHMENT_KEY,
        Buffer.from('second'),
        { contentType: undefined, filename: 'file', knownLength: undefined },
      );
      expect(appendSpy).toHaveBeenCalledWith(ATTACHMENT_KEY,
        Buffer.from('third'),
        { contentType: undefined, filename: 'file', knownLength: undefined },
      );
    });

    it('should not append non-attachment elements as attachment', () => {
      // Given
      const nonAttachmentObject = {
        incorrectKey: 'text',
      };
      const data = ['first', nonAttachmentObject];
      // When
      appendArrayToFormData(data as any, ATTACHMENT_KEY, formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(1);
      const expectedErrorMessage = 'Unknown value \'{"incorrectKey":"text"}\' with type \'object\' '
      + `for property '${ATTACHMENT_KEY}'. The key '${ATTACHMENT_KEY}' should have type of Buffer, Stream or String.`;
      expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMessage);
    });

    it('should append non-attachment elements as string', () => {
      // Given
      const nonAttachmentObject = {
        incorrectKey: 'text',
      };
      const data = ['first', nonAttachmentObject];
      // When
      appendArrayToFormData(data as any, 'non-attachment-key', formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(2);
      expect(appendSpy).toHaveBeenCalledWith('non-attachment-key', 'first');
      expect(appendSpy).toHaveBeenCalledWith('non-attachment-key', '{"incorrectKey":"text"}');
      const expectedWarnMessage = 'The received value is an object. \n'
        + '"JSON.Stringify" will be used to avoid TypeError \n'
        + 'To remove this warning: \n'
        + 'Consider switching to built-in FormData or converting the value on your own.\n';
      expect(consoleWarnSpy).toHaveBeenCalledWith(expectedWarnMessage);
    });

    it('should append a single attachment object as attachment', () => {
      // Given
      const data = Buffer.from('bufferAttachment');
      // When
      appendArrayToFormData(data, ATTACHMENT_KEY, formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(1);
      expect(appendSpy).toHaveBeenCalledWith(ATTACHMENT_KEY,
        data,
        { contentType: undefined, filename: 'file', knownLength: 16 },
      );
    });

    it('should append a single string object', () => {
      // Given
      const data = 'singleData';
      // When
      appendArrayToFormData(data, 'non-attachment-key', formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(1);
      expect(appendSpy).toHaveBeenCalledWith('non-attachment-key', 'singleData');
    });

    it('should append a single complex object and log a warning', () => {
      // Given
      const data = {
        incorrectKey: 'text',
      };
      // When
      appendArrayToFormData(data as any, 'non-attachment-key', formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(1);
      expect(appendSpy).toHaveBeenCalledWith('non-attachment-key', '{"incorrectKey":"text"}');
      const expectedWarnMessage = 'The received value is an object. \n'
        + '"JSON.Stringify" will be used to avoid TypeError \n'
        + 'To remove this warning: \n'
        + 'Consider switching to built-in FormData or converting the value on your own.\n';
      expect(consoleWarnSpy).toHaveBeenCalledWith(expectedWarnMessage);
    });

    it('should not append a non-attachment object as attachment and log an error', () => {
      // Given
      const data = {
        incorrectKey: 'text',
      };
      // When
      appendArrayToFormData(data as any, ATTACHMENT_KEY, formData);
      // Then
      expect(appendSpy).toHaveBeenCalledTimes(0);
      const expectedErrorMessage = 'Unknown value \'{"incorrectKey":"text"}\' with type \'object\' '
        + `for property '${ATTACHMENT_KEY}'. The key '${ATTACHMENT_KEY}' should have type of Buffer, Stream or String.`;
      expect(consoleErrorSpy).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });

});

