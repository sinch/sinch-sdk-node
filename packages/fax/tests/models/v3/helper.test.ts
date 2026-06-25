import { convertToSupportedFileType } from '../../../src/models';

describe('Fax models helpers', () => {

  describe('convertToSupportedFileType', () => {
    it('should convert a file extension to a FaxBase64FileType', () => {
      expect(convertToSupportedFileType('doc')).toBe('DOC');
      expect(convertToSupportedFileType('docx')).toBe('DOCX');
      expect(convertToSupportedFileType('pdf')).toBe('PDF');
      expect(convertToSupportedFileType('tif')).toBe('TIF');
      expect(convertToSupportedFileType('jpg')).toBe('JPG');
      expect(convertToSupportedFileType('odt')).toBe('ODT');
      expect(convertToSupportedFileType('txt')).toBe('TXT');
      expect(convertToSupportedFileType('html')).toBe('HTML');
      expect(convertToSupportedFileType('png')).toBe('PNG');
      expect(convertToSupportedFileType(undefined)).toBeUndefined();
      expect(convertToSupportedFileType('unknown')).toBe('UNKNOWN');
    });
  });

});
