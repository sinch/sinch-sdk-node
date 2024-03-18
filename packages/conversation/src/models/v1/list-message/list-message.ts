import { ListSection } from '../list-section';

/**
 * A message containing a list of options to choose from
 */
export interface ListMessage {
  /** A message containing a list of options to choose from */
  list_message: ListMessageItem;
}

export interface ListMessageItem {
  /** A title for the message that is displayed near the products or choices. */
  title: string;
  /** This is an optional field, containing a description for the message. */
  description?: string;
  /** List of ListSection objects containing choices to be presented in the list message. */
  sections: ListSection[];
  /** Additional properties for the message. Required if sending a product list message. */
  message_properties?: ListMessageItemProperties;
}

export interface ListMessageItemProperties {
  /** Required if sending a product list message. The ID of the catalog to which the products belong. */
  catalog_id?: string;
  /** Optional. Sets the text for the menu of a choice list message. */
  menu?: string;
}
