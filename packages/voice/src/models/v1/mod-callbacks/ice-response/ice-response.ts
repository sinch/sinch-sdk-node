import {
  SvamlActionHangup,
  SvamlActionConnectPstn,
  SvamlActionConnectMxp,
  SvamlActionConnectConf,
  SvamlActionConnectSip,
  SvamlActionRunMenu,
  SvamlActionPark,
  SvamlInstructionPlayFiles,
  SvamlInstructionSay,
  SvamlInstructionSendDtmf,
  SvamlInstructionSetCookie,
  SvamlInstructionStartRecording,
  SvamlInstructionAnswer,
} from '../../mod-svaml';

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
  /** The action that will control the call. Each SVAML object can only include one action. */
  action?: IceSvamlAction;
}
