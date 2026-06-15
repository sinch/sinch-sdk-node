import { FaxBase64FileType, validBase64FileTypes } from './enums';
import { Logger, SinchLogger, resolveLogger } from '@sinch/sdk-client';

export const convertToSupportedFileType = (
  fileType: string | undefined,
  logger?: Logger | null,
): FaxBase64FileType | undefined => {
  const sinchLogger = new SinchLogger(resolveLogger(logger));
  if (!fileType) {
    sinchLogger.warn('No file extension has been defined.');
    return undefined;
  }
  if (!validBase64FileTypes.includes(fileType.toUpperCase() as FaxBase64FileType)) {
    sinchLogger.warn(`The file extension "${fileType.toUpperCase()}" is not supported.`);
  }
  return fileType.toUpperCase() as FaxBase64FileType;
};
