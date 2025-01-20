import FormData = require('form-data');
import { OverrideProperties } from './override-properties';
import { AttachedFile, AttachedFileData, EmailAttachment } from './email-attachment';
import { getAttachmentInfo, isAttachedFile, isEmailAttachment } from './helpers-attachments';

export const appendDeliveryTimeOptimizePeriodToFormData = (sdkRequest: OverrideProperties, formData: FormData) => {
  formData.append('o:deliverytime-optimize-period', `${sdkRequest.deliveryTimeOptimizePeriod}h`);
};

export const appendArrayToFormData = (array: string | string[] | EmailAttachment, key: string, formData: FormData) => {
  if (Array.isArray(array)) {
    if (array.every((item) => isEmailAttachment(key, item))) {
      array.forEach((file) => {
        appendFileToFormData(file, key, formData);
      });
    } else {
      array.forEach((element) => {
        formData.append(key, element);
      });
    }
  } else {
    const element = array;
    if (isEmailAttachment(key, element)) {
      appendFileToFormData(element, key, formData);
    } else {
      formData.append(key, element);
    }
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
  if (typeof attachment === 'string') {
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
