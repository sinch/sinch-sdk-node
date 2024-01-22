import { SvamlActionHangup } from '../svaml-action-hangup';
import { SvamlActionConnectPstn } from '../svaml-action-connect-pstn';
import { SvamlActionConnectMxp } from '../svaml-action-connect-mxp';
import { SvamlActionConnectConf } from '../svaml-action-connect-conf';
import { SvamlActionConnectSip } from '../svaml-action-connect-sip';
import { SvamlActionRunMenu } from '../svaml-action-run-menu';
import { SvamlActionPark } from '../svaml-action-park';
import { SvamlInstructionPlayFiles } from '../svaml-instruction-play-files';
import { SvamlInstructionSay } from '../svaml-instruction-say';
import { SvamlInstructionSendDtmf } from '../svaml-instruction-send-dtmf';
import { SvamlInstructionSetCookie } from '../svaml-instruction-set-cookie';
import { SvamlInstructionStartRecording } from '../svaml-instruction-start-recording';
import { SvamlInstructionAnswer } from '../svaml-instruction-answer';

export type IceSvamlAction = SvamlActionHangup
  | SvamlActionConnectPstn
  | SvamlActionConnectMxp
  | SvamlActionConnectConf
  | SvamlActionConnectSip
  | SvamlActionRunMenu
  | SvamlActionPark;

export type IceSvamlInstruction = SvamlInstructionPlayFiles
  | SvamlInstructionSay
  | SvamlInstructionSendDtmf
  | SvamlInstructionSetCookie
  | SvamlInstructionStartRecording
  | SvamlInstructionAnswer;

export interface IceResponse {

  /** The collection of instructions that can perform various tasks during the call. You can include as many instructions as necessary. */
  instructions?: IceSvamlInstruction[];
  /** @see SvamlAction */
  action?: IceSvamlAction;
}
