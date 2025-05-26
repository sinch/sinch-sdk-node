import { BarCodeType } from '../enums';

/**
 * Sinch will scan all pages of all incoming faxes for Code-128 and DataMatrix bar codes and include this information in webhook requests and via the API.
 */
export interface BarCode {
  /** The type of barcode found. */
  type?: BarCodeType;
  /** The page number on which the barcode was found. */
  page?: number;
  /** The  information of the barcode. */
  value?: string;
}
