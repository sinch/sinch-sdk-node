import FormData = require('form-data');
import { appendCustomDataToFormData } from '../../../../../src/models/v1/emails/request/helpers';

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
      'first_name': 'John',
      'last_name': 'Smith',
      'my_message_id': '123',
      'date1': '2024-06-06T13:42:42Z',
      'date2': new Date('2024-06-06T13:42:42Z'),
    };

    appendCustomDataToFormData(obj, 'v:', formData);

    expect(appendSpy).toHaveBeenCalledTimes(5);
    expect(appendSpy).toHaveBeenCalledWith('v:first_name', 'John');
    expect(appendSpy).toHaveBeenCalledWith('v:last_name', 'Smith');
    expect(appendSpy).toHaveBeenCalledWith('v:my_message_id', '123');
    expect(appendSpy).toHaveBeenCalledWith('v:date1', '2024-06-06T13:42:42Z');
    expect(appendSpy).toHaveBeenCalledWith('v:date2', 'Thu, 06 Jun 2024 13:42:42 GMT');
  });

});
