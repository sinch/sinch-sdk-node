import { AttachedFile, AttachedFileData, EmailAttachment } from './email-attachment';

export const ATTACHMENT_KEY = 'attachment';
export const INLINE_KEY = 'inline';
export const ATTACHMENT_KEYS = [ATTACHMENT_KEY, INLINE_KEY];

export const isEmailAttachment = (key: string, value: unknown): value is EmailAttachment => {
  if (!ATTACHMENT_KEYS.includes(key)) {
    return false;
  }
  return Array.isArray(value)
    ? value.every(isCustomAttachment)
    : isCustomAttachment(value);
};

export const isCustomAttachment = (v: unknown): boolean =>
  isReadStream(v)
  || isAttachedFile(v)
  || isString(v)
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

export const isString = (data: unknown): data is string => {
  return typeof data === 'string';
};

type AttachmentInfo = {
  filename?: string;
  contentType?: string;
  knownLength?: number;
};

export const getAttachmentInfo = (attachment: string | AttachedFile | AttachedFileData): AttachmentInfo => {
  if (!isString(attachment)) {
    if (isBuffer(attachment)) {
      return {
        filename: 'file',
        contentType: undefined,
        knownLength: attachment.byteLength,
      };
    }
    if (isAttachedFile(attachment)) {
      const { filename, contentType, knownLength } = attachment;
      return { filename, contentType, knownLength };
    }
  }

  // No need to fill the rest of the data as the server will correctly process the request anyway
  return {
    filename: 'file',
    contentType: undefined,
    knownLength: undefined,
  };
};
