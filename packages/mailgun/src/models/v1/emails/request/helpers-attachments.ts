import { AttachedFile, AttachedFileData, EmailAttachment } from './email-attachment';

export const isEmailAttachment = (key: string, value: unknown): value is EmailAttachment => {
  if (['attachment', 'inline'].includes(key)) {
    if (Array.isArray(value)) {
      return value.every(isCustomAttachment);
    }
    return isCustomAttachment(value);
  }
  return false;
};

const isCustomAttachment = (v: unknown): boolean =>
  isReadStream(v)
  || isAttachedFile(v)
  || typeof v === 'string'
  || isFileLike(v)
  || isBuffer(v);

const isReadStream = (obj: unknown): obj is NodeJS.ReadableStream => {
  return obj !== null
    && typeof obj === 'object'
    && typeof (obj as NodeJS.ReadableStream).pipe === 'function'
    && typeof (obj as NodeJS.ReadableStream).read === 'function'
    && (obj as NodeJS.ReadableStream).readable;
};

const isFileLike = (v: unknown): boolean =>
  (typeof File !== 'undefined' && v instanceof File)
  || (typeof Blob !== 'undefined' && v instanceof Blob);

export const isAttachedFile= (obj: unknown): obj is AttachedFile => {
  return typeof obj === 'object'
    && !!(obj as AttachedFile).data;
};

const isBuffer = (data: unknown): data is Buffer => {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(data);
};

type AttachmentInfo = {
  filename?: string;
  contentType?: string;
  knownLength?: number;
};

export const getAttachmentInfo = (attachment: string | File | AttachedFile | AttachedFileData): AttachmentInfo => {
  const attachedFile = isAttachedFile(attachment);
  const isString = typeof attachment === 'string';
  if (!isString) {
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(attachment)) {
      return {
        filename: 'file',
        contentType: undefined,
        knownLength: attachment.byteLength,
      };
    }
    if (attachedFile) {
      const { filename, contentType, knownLength } = attachment;
      return { filename, contentType, knownLength };
    }
  }

  return {
    filename: 'file',
    contentType: undefined,
    knownLength: undefined,
  };
};
