import {
  SvamlActionHangup,
  SvamlActionConnectConf,
  SvamlActionRunMenu,
  SvamlActionContinue,
  SvamlInstructionPlayFiles,
  SvamlInstructionSay,
  SvamlInstructionSetCookie,
  SvamlInstructionStartRecording,
} from '../../mod-svaml';

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
  /** The action that will control the call. Each SVAML object can only include one action. */
  action?: AceSvamlAction;
}
