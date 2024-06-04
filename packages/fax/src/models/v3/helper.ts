import { FaxBase64FileType, validBase64FileTypes } from './enums';

export const convertToSupportedFileType = (fileType: string | undefined): FaxBase64FileType | undefined => {
  if (!fileType || !validBase64FileTypes.includes(fileType.toUpperCase() as FaxBase64FileType)) {
    return undefined;
  }
  return fileType.toUpperCase() as FaxBase64FileType;
};
