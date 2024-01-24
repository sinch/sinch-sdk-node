import { ConversationMessage } from '../conversation-message';

export interface ListMessagesResponse {

  /** List of messages associated to the referenced conversation. */
  messages?: ConversationMessage[];
  /** Token that should be included in the next request to fetch the next page. */
  next_page_token?: string;
  total_size?: number;
}
