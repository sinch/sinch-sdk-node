import {
  ConnectConfProps,
  ConnectMxpProps,
  ConnectPstnProps,
  ConnectSipProps,
  ParkProps,
  RunMenuProps,
  StartRecordingOptions,
  SvamlActionConnectConf,
  SvamlActionConnectMxp,
  SvamlActionConnectPstn,
  SvamlActionConnectSip,
  SvamlActionContinue,
  SvamlActionHangup,
  SvamlActionPark,
  SvamlActionRunMenu,
  SvamlInstructionAnswer,
  SvamlInstructionPlayFiles,
  SvamlInstructionSay,
  SvamlInstructionSendDtmf,
  SvamlInstructionSetCookie,
  SvamlInstructionStartRecording,
  SvamlInstructionStopRecording,
} from './mod-svaml';
import {
  AceResponse,
  AceSvamlAction, AceSvamlInstruction,
  CallbackResponse,
  IceResponse,
  IceSvamlAction, IceSvamlInstruction,
  PieResponse,
  PieSvamlAction, PieSvamlInstruction,
} from './mod-callbacks';
import { TtsVoice } from './enums';

class SvamletBuilder<A, I, R extends CallbackResponse<A, I>> {
  protected action: A | undefined;
  protected instructions: I[] | undefined;

  setAction = (action: A) => {
    this.action = action;
    return this;
  };
  addInstruction = (instruction: I) => {
    if (!this.instructions) {
      this.instructions = [];
    }
    this.instructions.push(instruction);
    return this;
  };
  build = (): R => {
    return {
      action: this.action,
      instructions: this.instructions,
    } as R;
  };
}

export class AceSvamletBuilder extends SvamletBuilder<AceSvamlAction, AceSvamlInstruction, AceResponse> {}

export class IceSvamletBuilder extends SvamletBuilder<IceSvamlAction, IceSvamlInstruction, IceResponse> {}

export class PieSvamletBuilder extends SvamletBuilder<PieSvamlAction, PieSvamlInstruction, PieResponse> {}

export const customCalloutHelper = {
  formatIceResponse: (action?: IceSvamlAction, ...instructions: IceSvamlInstruction[]): string => {
    const iceResponse: IceResponse = {
      action,
      instructions: instructions.length > 0 ? instructions : undefined,
    };
    return JSON.stringify(iceResponse);
  },
  formatAceResponse:(action?: AceSvamlAction, ...instructions: AceSvamlInstruction[]): string => {
    const aceResponse: AceResponse = {
      action,
      instructions: instructions.length > 0 ? instructions : undefined,
    };
    return JSON.stringify(aceResponse);
  },
  formatPieResponse:(action?: PieSvamlAction, ...instructions: PieSvamlInstruction[]): string => {
    const pieResponse: PieResponse = {
      action,
      instructions: instructions.length > 0 ? instructions : undefined,
    };
    return JSON.stringify(pieResponse);
  },
};

export const svamlActionHelper = {
  buildConnectConf: (connectConfProps: ConnectConfProps): SvamlActionConnectConf => {
    return {
      name: 'connectConf',
      ...connectConfProps,
    };
  },
  buildConnectMxp: (connectMxpProps: ConnectMxpProps): SvamlActionConnectMxp => {
    return {
      name: 'connectMxp',
      ...connectMxpProps,
    };
  },
  buildConnectPstn: (connectPstnProps: ConnectPstnProps): SvamlActionConnectPstn => {
    return {
      name: 'connectPstn',
      ...connectPstnProps,
    };
  },
  buildConnectSip: (connectSipProps: ConnectSipProps): SvamlActionConnectSip => {
    return {
      name: 'connectSip',
      ...connectSipProps,
    };
  },
  buildContinue: (): SvamlActionContinue => {
    return {
      name: 'continue',
    };
  },
  buildHangup: (): SvamlActionHangup => {
    return {
      name: 'hangup',
    };
  },
  buildPark: (parkProps: ParkProps): SvamlActionPark => {
    return {
      name: 'park',
      ...parkProps,
    };
  },
  buildRunMenu: (runMenuProps: RunMenuProps): SvamlActionRunMenu => {
    return {
      name: 'runMenu',
      ...runMenuProps,
    };
  },
};

export const svamlInstructionHelper = {
  buildAnswer: (): SvamlInstructionAnswer => {
    return {
      name: 'answer',
    };
  },
  buildPlayFiles: (ids: string[], locale?: TtsVoice): SvamlInstructionPlayFiles => {
    // TODO - check for server limitations
    return {
      name: 'playFiles',
      ids,
      locale,
    };
  },
  buildSay: (text: string, locale?: TtsVoice): SvamlInstructionSay => {
    return {
      name: 'say',
      text,
      locale,
    };
  },
  buildSendDtmf: (dtmfValue: string): SvamlInstructionSendDtmf => {
    const dtmfRegex = /^[0-9#w]+$/;
    if(!dtmfRegex.test(dtmfValue)) {
      console.error(`The DTMF value '${dtmfValue}' is incorrect. Valid characters are: 0-9, #, and w.`);
    }
    return {
      name: 'sendDtmf',
      value: dtmfValue,
    };
  },
  buildSetCookie: (name: string, value: string): SvamlInstructionSetCookie => {
    return {
      name: 'setCookie',
      key: name,
      value,
    };
  },
  buildStartRecording: (startRecordingOptions: StartRecordingOptions): SvamlInstructionStartRecording => {
    return {
      name: 'startRecording',
      options: {
        ...startRecordingOptions,
      },
    };
  },
  buildStopRecording: (): SvamlInstructionStopRecording => {
    return {
      name: 'stopRecording',
    };
  },
};

export const aceActionHelper = {
  hangup: svamlActionHelper.buildHangup,
  continue: svamlActionHelper.buildContinue,
  connectConf: svamlActionHelper.buildConnectConf,
  runMenu: svamlActionHelper.buildRunMenu,
};

export const aceInstructionHelper = {
  playFiles: svamlInstructionHelper.buildPlayFiles,
  say: svamlInstructionHelper.buildSay,
  setCookie: svamlInstructionHelper.buildSetCookie,
  startRecording: svamlInstructionHelper.buildStartRecording,
};

export const iceActionHelper = {
  hangup: svamlActionHelper.buildHangup,
  connectPstn: svamlActionHelper.buildConnectPstn,
  connectMxp: svamlActionHelper.buildConnectMxp,
  connectConf: svamlActionHelper.buildConnectConf,
  connectSip: svamlActionHelper.buildConnectSip,
  runMenu: svamlActionHelper.buildRunMenu,
  park: svamlActionHelper.buildPark,
};

export const iceInstructionHelper = {
  playFiles: svamlInstructionHelper.buildPlayFiles,
  say: svamlInstructionHelper.buildSay,
  sendDtmf: svamlInstructionHelper.buildSendDtmf,
  setCookie: svamlInstructionHelper.buildSetCookie,
  startRecording: svamlInstructionHelper.buildStartRecording,
  answer: svamlInstructionHelper.buildAnswer,
};

export const pieActionHelper = {
  hangup: svamlActionHelper.buildHangup,
  continue: svamlActionHelper.buildContinue,
  connectConf: svamlActionHelper.buildConnectConf,
  connectSip: svamlActionHelper.buildConnectSip,
  runMenu: svamlActionHelper.buildRunMenu,
};

export const pieInstructionHelper = {
  playFiles: svamlInstructionHelper.buildPlayFiles,
  say: svamlInstructionHelper.buildSay,
  sendDtmf: svamlInstructionHelper.buildSendDtmf,
  setCookie: svamlInstructionHelper.buildSetCookie,
  startRecording: svamlInstructionHelper.buildStartRecording,
  stopRecording: svamlInstructionHelper.buildStopRecording,
};
