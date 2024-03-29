import { ChoiceItem } from '../choice-item';
import { Product } from '../product';

/**
 * Section for interactive WhatsApp messages containing ListItem
 */
export interface ListSection {

  /** Optional parameter. Title for list section. */
  title?: string;
  /** List of ListItems */
  items?: ChoiceItem[] | Product[];
}
