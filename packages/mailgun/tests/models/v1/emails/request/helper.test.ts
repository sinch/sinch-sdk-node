import FormData = require('form-data');
import { appendFilteredPropertiesToFormData } from '../../../../../src/models/v1/emails/request/helper';

describe('appendFilteredPropertiesToFormData', () => {
  let formData: FormData;
  let appendSpy: jest.SpyInstance;

  beforeEach(() => {
    formData = new FormData();
    appendSpy = jest.spyOn(formData, 'append');
  });

  afterEach(() => {
    appendSpy.mockRestore();
  });

  it('should append properties with the specified prefix to FormData', () => {
    const obj = {
      'o:dkim': true,
      'o:tracking': 'yes',
      'v:first_name': 'John',
      'v:last_name': 'Smith',
      'v:my_message_id': '123',
      'v:date1': '2024-06-06T13:42:42Z',
      'v:date2': new Date('2024-06-06T13:42:42Z'),
    };

    appendFilteredPropertiesToFormData(obj, 'v:', formData);

    expect(appendSpy).toHaveBeenCalledTimes(5);
    expect(appendSpy).toHaveBeenCalledWith('v:first_name', 'John');
    expect(appendSpy).toHaveBeenCalledWith('v:last_name', 'Smith');
    expect(appendSpy).toHaveBeenCalledWith('v:my_message_id', '123');
    expect(appendSpy).toHaveBeenCalledWith('v:date1', '2024-06-06T13:42:42Z');
    expect(appendSpy).toHaveBeenCalledWith('v:date2', '2024-06-06T13:42:42.000Z');
  });

  it('should not append properties with null or undefined values', () => {
    const obj = {
      'o:dkim': true,
      'o:tracking': 'yes',
      'v:null': null,
      'v:undefined': undefined,
    };

    appendFilteredPropertiesToFormData(obj, 'v:', formData);

    expect(appendSpy).not.toHaveBeenCalled();
  });
});
