import {
  SvamlActionHangup,
  SvamlActionConnectConf,
  SvamlActionRunMenu,
  SvamlActionContinue,
  SvamlActionConnectSip,
  SvamlInstructionPlayFiles,
  SvamlInstructionSay,
  SvamlInstructionSendDtmf,
  SvamlInstructionSetCookie,
  SvamlInstructionStartRecording,
  SvamlInstructionStopRecording,
} from '../../mod-svaml';

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

/**
 * PIE callbacks are not available for DATA calls; only PSTN and SIP calls.
 */
export interface PieResponse {

  /** The collection of instructions that can perform various tasks during the call. You can include as many instructions as necessary. */
  instructions?: PieSvamlInstruction[];
  /** The action that will control the call. Each SVAML object can only include one action. */
  action?: PieSvamlAction;
}
