import { MediaMessageItem } from '../media-message';

export interface ChoiceItemWrapper {

  /** A message component for interactive messages, containing a choice. */
  choice: ChoiceItem;
}

export interface ChoiceItem {

  /** Required parameter. Title for the choice item. */
  title: string;
  /** Optional parameter. The description (or subtitle) of this choice item. */
  description?: string;
  /** @see MediaMessageItem */
  media_message?: MediaMessageItem;
  /** Optional parameter. Postback data that will be returned in the MO if the user selects this option. */
  postback_data?: string;
}
