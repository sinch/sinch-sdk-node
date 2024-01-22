import { SvamlActionHangup } from '../svaml-action-hangup';
import { SvamlActionConnectConf } from '../svaml-action-connect-conf';
import { SvamlActionRunMenu } from '../svaml-action-run-menu';
import { SvamlActionContinue } from '../svaml-action-continue';
import { SvamlActionConnectSip } from '../svaml-action-connect-sip';
import { SvamlInstructionPlayFiles } from '../svaml-instruction-play-files';
import { SvamlInstructionSay } from '../svaml-instruction-say';
import { SvamlInstructionSendDtmf } from '../svaml-instruction-send-dtmf';
import { SvamlInstructionSetCookie } from '../svaml-instruction-set-cookie';
import { SvamlInstructionStartRecording } from '../svaml-instruction-start-recording';
import { SvamlInstructionStopRecording } from '../svaml-instruction-stop-recording';

export type PieSvamlAction = SvamlActionHangup
  | SvamlActionContinue
  | SvamlActionConnectConf
  | SvamlActionConnectSip
  | SvamlActionRunMenu;

export type PieSvamlInstruction = SvamlInstructionPlayFiles
  | SvamlInstructionSay
  | SvamlInstructionSendDtmf
  | SvamlInstructionSetCookie
  | SvamlInstructionStartRecording
  | SvamlInstructionStopRecording;

export interface PieResponse {

  /** The collection of instructions that can perform various tasks during the call. You can include as many instructions as necessary. */
  instructions?: PieSvamlInstruction[];
  /** @see SvamlAction */
  action?: PieSvamlAction;
}
