import { ListItem } from '../list-item';

/**
 * Section for interactive whatsapp messages containing ListItem
 */
export interface ListSection {

  /** Optional parameter. Title for list section. */
  title?: string;
  /** List of ListItems */
  items?: ListItem[];
}
