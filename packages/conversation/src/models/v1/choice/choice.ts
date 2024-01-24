import { CallMessage } from '../call-message';
import { LocationMessageItem } from '../location-message';
import { TextMessageItem } from '../text-message';
import { UrlMessage } from '../url-message';

/**
 * A choice is an action the user can take such as buttons for quick replies or other call to actions.
 */
export interface Choice {

  /** @see CallMessage */
  call_message: CallMessage;
  /** @see LocationMessage */
  location_message: LocationMessageItem;
  /** An optional field. This data will be returned in the ChoiceResponseMessage. The default is message_id_{text, title}. */
  postback_data :string;
  /** @see TextMessageItem */
  text_message: TextMessageItem;
  /** @see UrlMessage */
  url_message: UrlMessage;
}


