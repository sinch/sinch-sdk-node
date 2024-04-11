import { ContactCreateRequest } from '../../contact-create-request';
import { Recipient } from '../../recipient';
import { GetChannelProfileRequest } from '../../get-channel-profile-request';
import { ConversationChannel } from '../../conversation-channel';
import { MergeContactRequest } from '../../merge-contact-request';
import { Contact } from '../../contact';

export interface CreateContactRequestData {
  /** The contact to create. */
  'contactCreateRequestBody': ContactCreateRequest;
}
export interface DeleteContactRequestData {
  /** The unique ID of the contact. */
  'contact_id': string;
}
export interface GetChannelProfileRequestData<T extends Recipient> {
  /**  */
  'getChannelProfileRequestBody': GetChannelProfileRequest<T>;
}
export interface GetContactRequestData {
  /** The unique ID of the contact. */
  'contact_id': string;
}
export interface ListContactsRequestData {
  /** Optional. The maximum number of contacts to fetch. The default is 10 and the maximum is 20. */
  'page_size'?: number;
  /** Optional. Next page token previously returned if any. */
  'page_token'?: string;
  /** Optional. Contact identifier in an external system. If used, `channel` and `identity` query parameters can\'t be used. */
  'external_id'?: string;
  /** Optional. Specifies a channel, and must be set to one of the enum values. If set, the `identity` parameter must be set and `external_id` can\'t be used. Used in conjunction with `identity` to uniquely identify the specified channel identity. */
  'channel'?: ConversationChannel;
  /** Optional. If set, the `channel` parameter must be set and `external_id` can\'t be used. Used in conjunction with `channel` to uniquely identify the specified channel identity. This will differ from channel to channel. For example, a phone number for SMS, WhatsApp, and Viber Business. */
  'identity'?: string;
}
export interface MergeContactRequestData {
  /** The unique ID of the contact that should be kept when merging two contacts. */
  'destination_id': string;
  /** The contact to be removed. */
  'mergeContactRequestBody': MergeContactRequest;
}
export interface UpdateContactRequestData {
  /** The unique ID of the contact. */
  'contact_id': string;
  /** The updated contact. */
  'updateContactRequestBody': Contact;
  /** The set of field mask paths. */
  'update_mask'?: Array<string>;
}
