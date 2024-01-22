import { textToHex } from '../../src';

describe('Text to hexadecimal', () => {

  it('should transform a string to its hexadecimal equivalent', () => {
    const text = 'UserDataHeader';
    const hex = textToHex(text);
    expect(hex).toEqual('5573657244617461486561646572');
  });

});
