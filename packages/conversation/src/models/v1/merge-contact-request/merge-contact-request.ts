import { ConversationMergeStrategy } from '../conversation-merge-strategy';

export interface MergeContactRequest {

  /** Required. The ID of the contact that should be removed. */
  source_id: string;
  /** @see ConversationMergeStrategy */
  strategy?: ConversationMergeStrategy;
}
