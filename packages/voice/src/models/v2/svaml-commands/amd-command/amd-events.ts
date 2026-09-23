import { SvamlCommand } from '../svaml-command';

/**
 * SVAML commands to execute based on the answering machine detection result. These events define different call flows depending on whether a human, machine, beep, or unknown entity answers the call.
 */
export interface AmdEvents {
  /** SVAML commands to be executed when a human is detected */
  onHuman?: SvamlCommand[];
  /** SVAML commands to be executed when a machine is detected */
  onMachine?: SvamlCommand[];
  /** SVAML commands to be executed when a beep is detected */
  onBeep?: SvamlCommand[];
  /** SVAML commands to be executed when an unknown event is detected */
  onUnknown?: SvamlCommand[];
}
