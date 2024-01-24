import { MediaMessage } from '../media-message';

export interface ChoiceItem {

  /** Required parameter. Title for the choice item. */
  title: string;
  /** Optional parameter. The description (or subtitle) of this choice item. */
  description?: string;
  /** @see MediaMessage */
  media?: MediaMessage;
  /** Optional parameter. Postback data that will be returned in the MO if the user selects this option. */
  postback_data?: string;
}
