import { SvamlCommand } from '../svaml-command';

/**
 * Webhook to handle call events, used when callBehaviors are set to WEBHOOK
 */
export interface CallEvents {
  /** SVAML commands to be executed when the call is answered */
  onAnswer?: SvamlCommand[];
  /** SVAML commands to be executed when the call is busy */
  onBusy?: SvamlCommand[];
  /** SVAML commands to be executed when the call is rejected */
  onReject?: SvamlCommand[];
  /** SVAML commands to be executed when the call is timed out */
  onTimeout?: SvamlCommand[];
  /** SVAML commands to be executed when the call is hung up */
  onHangup?: SvamlCommand[];
  /** SVAML commands to be executed when the call fails */
  onFailure?: SvamlCommand[];
}
