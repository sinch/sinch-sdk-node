import { SvamlActionHangup } from '../svaml-action-hangup';
import { SvamlActionConnectConf } from '../svaml-action-connect-conf';
import { SvamlActionRunMenu } from '../svaml-action-run-menu';
import { SvamlActionContinue } from '../svaml-action-continue';
import { SvamlInstructionPlayFiles } from '../svaml-instruction-play-files';
import { SvamlInstructionSay } from '../svaml-instruction-say';
import { SvamlInstructionSetCookie } from '../svaml-instruction-set-cookie';
import { SvamlInstructionStartRecording } from '../svaml-instruction-start-recording';

export type AceSvamlAction = SvamlActionHangup
  | SvamlActionContinue
  | SvamlActionConnectConf
  | SvamlActionRunMenu;

export type AceSvamlInstruction = SvamlInstructionPlayFiles
  | SvamlInstructionSay
  | SvamlInstructionSetCookie
  | SvamlInstructionStartRecording;

export interface AceResponse {

  /** The collection of instructions that can perform various tasks during the call. You can include as many instructions as necessary. */
  instructions?: AceSvamlInstruction[];
  /** @see SvamlAction */
  action?: AceSvamlAction;
}
