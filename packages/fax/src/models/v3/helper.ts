import { FaxBase64FileType, validBase64FileTypes } from './enums';

export const convertToSupportedFileType = (fileType: string | undefined): FaxBase64FileType | undefined => {
  if (!fileType) {
    console.warn('No file extension has been defined.');
    return undefined;
  }
  if (!validBase64FileTypes.includes(fileType.toUpperCase() as FaxBase64FileType)) {
    console.warn(`The file extension "${fileType.toUpperCase()}" is not supported.`);
  }
  return fileType.toUpperCase() as FaxBase64FileType;
};
