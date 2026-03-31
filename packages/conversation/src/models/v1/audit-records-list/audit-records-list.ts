import { AuditRecord } from '../audit-record';
import { ConsentIdentity } from '../consent-identity';

export interface AuditRecordsList {
  /** @see ConsentIdentity */
  identity?: ConsentIdentity;
  /** List of audit records associated with the given identity */
  audit_records?: AuditRecord[];
}
