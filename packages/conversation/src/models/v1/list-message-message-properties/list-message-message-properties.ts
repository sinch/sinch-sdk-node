/**
 * Additional properties for the message. Required if sending a product list message.
 */
export interface ListMessageMessageProperties {

  /** Required if sending a product list message. The ID of the catalog to which the products belong. */
  catalog_id?: string;
  /** Optional. Sets the text for the menu of a choice list message. */
  menu?: string;
}
