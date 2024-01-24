import { ListMessageMessageProperties } from '../list-message-message-properties';
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
  /** @see ListMessageMessageProperties */
  message_properties?: ListMessageMessageProperties;
}
