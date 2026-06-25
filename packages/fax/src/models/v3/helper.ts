import { FaxBase64FileType } from './enums';

export const convertToSupportedFileType = (
  fileType: string | undefined,
): FaxBase64FileType | undefined => {
  if (!fileType) {
    return undefined;
  }
  return fileType.toUpperCase() as FaxBase64FileType;
};
