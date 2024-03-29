import { ProductItem } from '../product-item';

/**
 * Represents an interactive WhatsApp message containing ProductItem objects
 */
export interface ProductResponseMessage {
  /** The selected products. */
  products: ProductItem[];
  /** Optional parameter. Text that may be sent with selected products. */
  text?: string;
  /** Optional parameter. The catalog id that the selected products belong to. */
  catalog_id?: string;
}
