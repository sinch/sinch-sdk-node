/**
 * The retention policy configured for the app. For more information about retention policies, see [Retention Policy](/docs/conversation/keyconcepts/#retention-policy).
 */
export interface RetentionPolicy {

  retention_type?: 'MESSAGE_EXPIRE_POLICY' | 'CONVERSATION_EXPIRE_POLICY' | 'PERSIST_RETENTION_POLICY';
  /** Optional. The days before a message or conversation is eligible for deletion. Default value is 180. The ttl_days value has no effect when retention_type is `PERSIST_RETENTION_POLICY`. The valid values for this field are [1 - 3650]. Note that retention cleanup job runs once every twenty-four hours which can lead to delay i.e., messages and conversations are not deleted on the minute they become eligible for deletion. */
  ttl_days?: number;
}
