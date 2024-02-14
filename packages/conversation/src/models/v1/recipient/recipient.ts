import { ContactId } from '../contact-id';
import { IdentifiedBy } from '../identified-by';

/**
 * Identifies the recipient of the message. Requires either `contact_id` or `identified_by`.
 */
export type Recipient = ContactId | IdentifiedBy;
