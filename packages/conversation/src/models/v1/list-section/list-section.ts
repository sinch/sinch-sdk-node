import { ChoiceItemWrapper } from '../choice-item';
import { ProductItemWrapper } from '../product-item';

/**
 * Section for interactive WhatsApp messages containing ListItem
 */
export interface ListSection {

  /** Optional parameter. Title for list section. */
  title?: string;
  /** List of ListItems */
  items?: ChoiceItemWrapper[] | ProductItemWrapper[];
}
