import FormData = require('form-data');
import { OverrideProperties } from './override-properties';
import { AttachedFile, AttachedFileData, EmailAttachment } from './email-attachment';
import {
  ATTACHMENT_KEYS,
  getAttachmentInfo,
  isAttachedFile,
  isCustomAttachment,
  isEmailAttachment,
  isString,
} from './helpers-attachments';

export const appendDeliveryTimeOptimizePeriodToFormData = (sdkRequest: OverrideProperties, formData: FormData) => {
  formData.append('o:deliverytime-optimize-period', `${sdkRequest.deliveryTimeOptimizePeriod}h`);
};

export const appendArrayToFormData = (data: string | string[] | EmailAttachment, key: string, formData: FormData) => {
  if (Array.isArray(data)) {
    const array = data;
    // Append all items as files if they are attachments
    if (array.every((item) => isEmailAttachment(key, item))) {
      array.forEach((file) => {
        appendFileToFormData(file, key, formData);
      });
    } else {
      // Append all items as strings
      array.forEach((element) => {
        appendAnyObjectToFormData(element, key, formData);
      });
    }
  } else {
    appendElementToFormData(data, key, formData);
  }
};

const appendElementToFormData = (
  element: string | AttachedFile | AttachedFileData,
  key: string,
  formData: FormData,
): void => {
  if (isEmailAttachment(key, element)) {
    appendFileToFormData(element, key, formData);
  } else {
    appendAnyObjectToFormData(element, key, formData);
  }
};

const appendAnyObjectToFormData = (
  element: any,
  key: string,
  formData: FormData,
): void => {
  if (ATTACHMENT_KEYS.includes(key) && !isCustomAttachment(element)) {
    console.error(
      `Unknown value '${JSON.stringify(element)}' with type '${typeof element}' for property '${key}'. `
      + `The key '${key}' should have type of Buffer, Stream or String.`);
    return;
  }
  if (typeof element === 'object') {
    console.warn('The received value is an object. \n'
      + '"JSON.Stringify" will be used to avoid TypeError \n'
      + 'To remove this warning: \n'
      + 'Consider switching to built-in FormData or converting the value on your own.\n');
    formData.append(key, JSON.stringify(element));
  } else {
    formData.append(key, element);
  }
};

const appendFileToFormData = (
  attachment: string | AttachedFile | AttachedFileData,
  key: string,
  formData: FormData,
) => {
  const file = getFileFromAttachment(attachment);
  const options = getAttachmentInfo(attachment);
  formData.append(key, file, options);
};

const getFileFromAttachment = (
  attachment: string | AttachedFile | AttachedFileData,
): Buffer | AttachedFileData => {
  if (isString(attachment)) {
    return Buffer.from(attachment);
  }
  if (isAttachedFile(attachment)) {
    return attachment.data;
  }
  return attachment;
};

export const appendCustomDataToFormData = (
  customData: Record<string, any> ,
  prefix: string,
  formData: FormData,
) => {
  for (const [key, value] of Object.entries(customData)) {
    if (value instanceof Date) {
      formData.append(prefix + key, value.toUTCString());
    } else {
      formData.append(prefix + key, value);
    }
  }
};

export const appendSerializedMapToFormData = (
  data: { [key: string]: Record<string, string | number | boolean | Date> },
  key: string,
  formData: FormData,
)=> {
  const serializedData = JSON.stringify(data, (_key, value) => {
    if (value instanceof Date) {
      return value.toUTCString();
    }
    return value;
  });
  formData.append(key, serializedData);
};

export const transformDateIntoApiRequestFormat = (data: Date | string): string => {
  if (data instanceof Date) {
    return data.toUTCString();
  }
  return data;
};
