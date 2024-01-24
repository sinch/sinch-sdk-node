import { Product } from '../product';
import { Choice } from '../choice';

/**
 * Item containing either choiceItem or ProductItem
 */
export interface ListItem {

  item: Choice | Product;
}
