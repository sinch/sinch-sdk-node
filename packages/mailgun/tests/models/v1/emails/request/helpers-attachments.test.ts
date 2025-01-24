import { getAttachmentInfo, isEmailAttachment } from '../../../../../src/models/v1/emails/request/helpers-attachments';
import { createReadStream } from 'fs';
import path from 'path';
import { AttachedFile } from '../../../../../src/models';

// Given
const stringAttachment = 'stringAttachment';
const emailAttachment: AttachedFile = {
  data: 'data',
  filename: 'filename',
  contentType: 'application/octet-stream',
};
const bufferAttachment = Buffer.from('bufferAttachment');
const bufferAttachmentFile: AttachedFile = {
  data: bufferAttachment,
  filename: 'filename',
  contentType: 'application/octet-stream',
  knownLength: bufferAttachment.byteLength,
};
const image = createReadStream(path.join(__dirname, '..', 'attachments', 'mailgun-logo.png'));
const imageAttachment: AttachedFile = {
  data: image,
  filename: 'image.png',
  contentType: 'image/png',
};

describe('isEmailAttachment', () => {

  it('should detect a string is an EmailAttachment', () => {
    // When
    const result = isEmailAttachment('attachment', stringAttachment);
    // Then
    expect(result).toBeTruthy();
  });

  it('should detect a Buffer is an EmailAttachment', () => {
    // When
    const result = isEmailAttachment('attachment', bufferAttachment);
    // Then
    expect(result).toBeTruthy();
  });

  it('should detect an AttachedFile object is an EmailAttachment', () => {
    // When
    const result = isEmailAttachment('attachment', emailAttachment);
    // Then
    expect(result).toBeTruthy();
  });

  it('should detect a ReadStream object is an EmailAttachment', () => {
    // When
    const result = isEmailAttachment('attachment', image);
    // Then
    expect(result).toBeTruthy();
  });

  it('should detect an array of AttachedFile objects is an EmailAttachment', () => {
    // Given
    const object = [ bufferAttachmentFile, imageAttachment ];
    // When
    const result = isEmailAttachment('attachment', object);
    // Then
    expect(result).toBeTruthy();
  });

  it('should detect an array of AttachedFile objects of various shapes is an EmailAttachment', () => {
    // Given
    const object = [stringAttachment, emailAttachment];
    // When
    const result = isEmailAttachment('attachment', object);
    // Then
    expect(result).toBeTruthy();
  });

  it('should reject the attachment if one of the object is invalid', () => {
    // Given
    const invalidObject = {
      invalidPropertyName: image,
      filename: 'image.png',
      contentType: 'image/png',
    };
    const object = [ bufferAttachmentFile, invalidObject ];
    // When
    const result = isEmailAttachment('attachment', object);
    // Then
    expect(result).toBeFalsy();
  });

  it('should reject a valid attachment if the key is incorrect', () => {
    // When
    const result = isEmailAttachment('notValid', stringAttachment);
    // Then
    expect(result).toBeFalsy();
  });

  it('should reject an invalid object as an attachment', () => {
    // Given
    const booleanObject = true;
    const numberObject = 42;
    const invalidObject = {
      notExpectedKey: 'data',
    };
    // When
    const resultBoolean = isEmailAttachment('inline', booleanObject);
    const resultNumber = isEmailAttachment('inline', numberObject);
    const resultInvalidObject = isEmailAttachment('inline', invalidObject);
    // Then
    expect(resultBoolean).toBeFalsy();
    expect(resultNumber).toBeFalsy();
    expect(resultInvalidObject).toBeFalsy();
  });
});

describe('getAttachmentInfo', () => {

  it('should fill the attachment info for a string', () => {
    // When
    const result = getAttachmentInfo(stringAttachment);
    // Then
    expect(result).toEqual({
      filename: 'file',
      contentType: undefined,
      knownLength: undefined,
    });
  });

  it('should fill the attachment info for a Buffer', () => {
    // When
    const result = getAttachmentInfo(bufferAttachment);
    // Then
    expect(result).toEqual({
      filename: 'file',
      contentType: undefined,
      knownLength: 16,
    });
  });

  it('should fill the attachment info for a AttachedFile', () => {
    // When
    const result = getAttachmentInfo(emailAttachment);
    // Then
    expect(result).toEqual({
      filename: 'filename',
      contentType: 'application/octet-stream',
      knownLength: undefined,
    });
  });

  it('should fill the attachment info for a image attachment', () => {
    // When
    const result = getAttachmentInfo(imageAttachment);
    // Then
    expect(result).toEqual({
      filename: 'image.png',
      contentType: 'image/png',
      knownLength: undefined,
    });
  });
});
