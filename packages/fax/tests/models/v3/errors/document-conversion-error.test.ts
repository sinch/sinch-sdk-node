import { documentConversionErrorCodeLabels, DocumentConversionErrorCodeEnum } from '../../../../src/models';

describe('documentConversionErrorCodeLabels', () => {
  it('should have correct labels for each DocumentConversionErrorCodeEnum', () => {
    const expectedLabels = new Map<DocumentConversionErrorCodeEnum, string>([
      [4, 'There was a problem in converting and merging files to the output file format. Contact support.'],
      [54, 'Could not access the url you provided. {contentUrl}'],
      [55, 'The string_data URL you provided is invalid'],
      [57, 'There was a problem storing the file you provided.'],
      [69, 'There was a problem storing the file you provided.'],
      [122, 'User simulated Document Conversion Error'],
      [128, 'Could not determine mimetype for file.'],
      [129, 'Mimetype not supported.'],
      [130, 'Mimetype not supported: application/xml'],
      [133, 'Failed to normalize PDF document'],
    ]);

    for (const [code, label] of expectedLabels.entries()) {
      expect(documentConversionErrorCodeLabels[code]).toBe(label);
    }
  });

  it('should not have a label for an undefined code', () => {
    expect(documentConversionErrorCodeLabels[-1]).toBeUndefined();
  });
});
