import { convertToSupportedFileType } from '../../../src/models';

describe('Fax models helpers', () => {

  describe('convertToSupportedFileType', () => {
    it('should convert a file extension to a FaxBase64FileType', () => {
      console.warn = jest.fn();
      let convertedFileExtension = convertToSupportedFileType('doc');
      expect(console.warn).toHaveBeenCalledWith('The file extension "DOC" is not supported.');
      expect(convertedFileExtension).toBe('DOC');

      convertedFileExtension = convertToSupportedFileType('docx');
      expect(convertedFileExtension).toBe('DOCX');

      convertedFileExtension = convertToSupportedFileType('pdf');
      expect(convertedFileExtension).toBe('PDF');

      convertedFileExtension = convertToSupportedFileType('tif');
      expect(convertedFileExtension).toBe('TIF');

      convertedFileExtension = convertToSupportedFileType('jpg');
      expect(convertedFileExtension).toBe('JPG');

      convertedFileExtension = convertToSupportedFileType('odt');
      expect(convertedFileExtension).toBe('ODT');

      convertedFileExtension = convertToSupportedFileType('txt');
      expect(convertedFileExtension).toBe('TXT');

      convertedFileExtension = convertToSupportedFileType('html');
      expect(convertedFileExtension).toBe('HTML');

      convertedFileExtension = convertToSupportedFileType('png');
      expect(convertedFileExtension).toBe('PNG');

      convertedFileExtension = convertToSupportedFileType(undefined);
      expect(console.warn).toHaveBeenCalledWith('No file extension has been defined.');
      expect(convertedFileExtension).toBeUndefined();

      convertedFileExtension = convertToSupportedFileType('unknown');
      expect(console.warn).toHaveBeenCalledWith('The file extension "UNKNOWN" is not supported.');
      expect(convertedFileExtension).toBe('UNKNOWN');
    });
  });

});
