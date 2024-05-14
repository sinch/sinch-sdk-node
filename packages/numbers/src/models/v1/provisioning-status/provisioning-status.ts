/**
 * The provisioning status. It will be either `WAITING`, `IN_PROGRESS` or `FAILED`. If the provisioning fails, a reason for the failure will be provided.
 */
export type ProvisioningStatus =
  | 'PROVISIONING_STATUS_UNSPECIFIED'
  | 'WAITING'
  | 'IN_PROGRESS'
  | 'FAILED';
