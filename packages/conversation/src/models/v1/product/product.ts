/**
 * A message component for interactive messages, containing a product.
 */
export interface Product {

  /** A message component for interactive messages, containing a product. */
  product?: ProductItem;
}

export interface ProductItem {

  /** Required parameter. The ID for the product. */
  id: string;
  /** Required parameter. The marketplace to which the product belongs. */
  marketplace: string;
  /** Output only. The quantity of the chosen product. */
  quantity?: number;
  /** Output only. The price for one unit of the chosen product. */
  item_price?: number;
  /** Output only. The currency of the item_price. */
  currency?: string;
}
