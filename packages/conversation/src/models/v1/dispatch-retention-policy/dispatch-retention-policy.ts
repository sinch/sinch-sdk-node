import { DispatchRetentionPolicyType } from '../dispatch-retention-policy-type';

/**
 * The retention policy configured for messages in [Dispatch Mode](../../../../../conversation/processing-modes/). Currently only `MESSAGE_EXPIRE_POLICY` is available. For more information about retention policies, see [Retention Policy](/docs/conversation/keyconcepts/#retention-policy).
 */
export interface DispatchRetentionPolicy {

  /** @see DispatchRetentionPolicyType */
  retention_type?: DispatchRetentionPolicyType;
  /** Optional. The days before a message is eligible for deletion. The valid range is `[0 - 7]`. In the case of a `0` day TTL, messages aren\'t stored at all. Note the retention cleanup job runs once every twenty-four hours, so messages are not deleted on the minute they become eligible for deletion. */
  ttl_days?: number;
}
