import {
  aceActionHelper,
  aceInstructionHelper,
  AceSvamletBuilder,
  customCalloutHelper,
  iceActionHelper,
  iceInstructionHelper,
  IceSvamletBuilder,
  pieActionHelper,
  pieInstructionHelper,
  PieSvamletBuilder,
  svamlActionHelper,
  svamlInstructionHelper,
  Voice,
} from '../../../src';

const CONFERENCE_ID = 'conferenceId';
const NUMBER = '+461234567890';
const CLI = '+460987654321';
const CALL_HEADERS: Voice.CallHeader[] = [
  {
    key: 'foo',
    value: 'bar',
  },
  {
    key: 'baz',
    value: 'qux',
  },
];

const RECORDING_OPTIONS: Voice.StartRecordingOptions = {
  destinationUrl: 'azure://my-account/test-container/my-recording.mp3',
  credentials: 'dummyAzureCredentials',
  format: 'mp3',
  notificationEvents: true,
  transcriptionOptions: {
    enabled: true,
    locale: 'en-US',
  },
};

describe('Voice models helpers', () => {

  describe('SVAML Actions helper', () => {
    it('should build a connectConf action', () => {
      const connectConfProps: Voice.ConnectConfProps = {
        conferenceId:CONFERENCE_ID,
        conferenceDtmfOptions: {
          mode: 'detect',
          maxDigits: 1,
          timeoutMills: 5000,
        },
        moh: 'music1',
      };
      const expectedResult: Voice.SvamlActionConnectConf = {
        ...connectConfProps,
        name: 'connectConf',
      };
      const builtAction = svamlActionHelper.buildConnectConf(connectConfProps);
      expect(builtAction).toEqual(expectedResult);
    });

    it('should build a connectMxp action', () => {
      const connectMxpProps: Voice.ConnectMxpProps = {
        destination: {
          type: 'username',
          endpoint: 'johndoe',
        },
        callHeaders: CALL_HEADERS,
      };
      const expectedResult: Voice.SvamlActionConnectMxp = {
        ...connectMxpProps,
        name: 'connectMxp',
      };
      const builtAction = svamlActionHelper.buildConnectMxp(connectMxpProps);
      expect(builtAction).toEqual(expectedResult);
    });

    it('should build a connectPstn action', () => {
      const connectPstnProps: Voice.ConnectPstnProps = {
        number: NUMBER,
        locale: 'en-US',
        maxDuration: 3000,
        dialTimeout: 10,
        cli: CLI,
        suppressCallbacks: false,
        indications: 'se',
        dtmf: 'ww1234#w#',
        amd: {
          enabled: true,
        },
      };
      const expectedResult: Voice.SvamlActionConnectPstn = {
        ...connectPstnProps,
        name: 'connectPstn',
      };
      const builtAction = svamlActionHelper.buildConnectPstn(connectPstnProps);
      expect(builtAction).toEqual(expectedResult);
    });

    it('should build a connectSip action', () => {
      const connectSipProps: Voice.ConnectSipProps = {
        destination: {
          type: 'Sip',
          endpoint: '46708000000@sip.foo.com',
        },
        maxDuration: 3000,
        cli: 'private',
        transport: 'tls',
        suppressCallbacks: false,
        callHeaders: CALL_HEADERS,
        moh: 'music2',
      };
      const expectedResult: Voice.SvamlActionConnectSip = {
        ...connectSipProps,
        name: 'connectSip',
      };
      const builtAction = svamlActionHelper.buildConnectSip(connectSipProps);
      expect(builtAction).toEqual(expectedResult);
    });

    it('should build a continue action', () => {
      const expectedResult: Voice.SvamlActionContinue = {
        name: 'continue',
      };
      const builtAction = svamlActionHelper.buildContinue();
      expect(builtAction).toEqual(expectedResult);
    });

    it('should build a hangup action', () => {
      const expectedResult: Voice.SvamlActionHangup = {
        name: 'hangup',
      };
      const builtAction = svamlActionHelper.buildHangup();
      expect(builtAction).toEqual(expectedResult);
    });

    it('should build a park action', () => {
      const parkProps: Voice.ParkProps = {
        locale: 'en-US',
        introPrompt: '#tts[Welcome]',
        holdPrompt: '#tts[Thank you for your patience, your call is very important to us.]',
        maxDuration: 180,
      };
      const expectedResult: Voice.SvamlActionPark = {
        ...parkProps,
        name: 'park',
      };
      const builtAction = svamlActionHelper.buildPark(parkProps);
      expect(builtAction).toEqual(expectedResult);
    });

    it('should build a runMenu action', () => {
      const runMenuProps: Voice.RunMenuProps = {
        barge: true,
        locale: 'en-US',
        enableVoice: true,
        mainMenu: 'main',
        menus: [
          {
            id: 'main',
            mainPrompt: '#tts[Welcome to the main menu. Press 1 for support or 2 to continue.]',
            repeatPrompt: '#tts[Sorry, please try again. Press 1 for support or 2 to continue.]',
            repeats: 2,
            maxDigits: 1,
            timeoutMills: 5000,
            maxTimeoutMills: 20000,
            options: [
              {
                dtmf: '1',
                action: 'return(support)',
              },
              {
                dtmf: '2',
                action: 'menu(sub)',
              },
            ],
          },
          {
            id: 'sub',
            mainPrompt: '#tts[Welcome to the sub menu. Enter your 4-digit PIN.]',
            options: [
              {
                dtmf: '1',
                action: 'menu(main)',
              },
            ],
          },
        ],
      };
      const expectedResult: Voice.SvamlActionRunMenu = {
        ...runMenuProps,
        name: 'runMenu',
      };
      const builtAction = svamlActionHelper.buildRunMenu(runMenuProps);
      expect(builtAction).toEqual(expectedResult);
    });
  });

  describe('SVAML Instructions helper', () => {
    it('should build an answer instruction', () => {
      const expectedResult: Voice.SvamlInstructionAnswer = {
        name: 'answer',
      };
      const builtInstruction = svamlInstructionHelper.buildAnswer();
      expect(builtInstruction).toEqual(expectedResult);
    });

    it('should build a playFiles instruction', () => {
      const ids = [
        '[Welcome]',
      ];
      const playFilesProps: Voice.PlayFilesProps = {
        locale: 'Enrique',
        ids,
      };
      const expectedResult: Voice.SvamlInstructionPlayFiles = {
        ...playFilesProps,
        name: 'playFiles',
      };
      const builtInstruction = svamlInstructionHelper.buildPlayFiles(ids, 'Enrique');
      expect(builtInstruction).toEqual(expectedResult);
    });

    it('should build a say instruction', () => {
      const text = 'Hello, this is a text-to-speech message.';
      const sayProps: Voice.SayProps = {
        text,
        locale: 'Ivy',
      };
      const expectedResult: Voice.SvamlInstructionSay = {
        ...sayProps,
        name: 'say',
      };
      const builtInstruction = svamlInstructionHelper.buildSay(text, 'Ivy');
      expect(builtInstruction).toEqual(expectedResult);
    });

    it('should build a sendDtmf instruction', () => {
      const sendDtmfProps: Voice.SendDtmfProps = {
        value: '1234#',
      };
      const expectedResult: Voice.SvamlInstructionSendDtmf = {
        ...sendDtmfProps,
        name: 'sendDtmf',
      };
      const builtInstruction = svamlInstructionHelper.buildSendDtmf('1234#');
      expect(builtInstruction).toEqual(expectedResult);
    });

    it('should build a setCookie instruction', () => {
      const setCookieProps: Voice.SetCookieProps = {
        key: 'cookie-name',
        value: 'cookie-value',
      };
      const expectedResult: Voice.SvamlInstructionSetCookie = {
        ...setCookieProps,
        name: 'setCookie',
      };
      const builtInstruction = svamlInstructionHelper.buildSetCookie('cookie-name', 'cookie-value');
      expect(builtInstruction).toEqual(expectedResult);
    });

    it('should build a startRecording instruction', () => {
      const startRecordingProps: Voice.StartRecordingProps = {
        options: {
          ...RECORDING_OPTIONS,
        },
      };
      const expectedResult: Voice.SvamlInstructionStartRecording = {
        ...startRecordingProps,
        name: 'startRecording',
      };
      const builtInstruction = svamlInstructionHelper.buildStartRecording(RECORDING_OPTIONS);
      expect(builtInstruction).toEqual(expectedResult);
    });

    it('should build a stopRecording instruction', () => {
      const expectedResult: Voice.SvamlInstructionStopRecording = {
        name: 'stopRecording',
      };
      const builtInstruction = svamlInstructionHelper.buildStopRecording();
      expect(builtInstruction).toEqual(expectedResult);
    });
  });

  describe('ACE response builder', () => {
    it('should build an ACE response', () => {
      const aceResponse = new AceSvamletBuilder()
        .setAction(aceActionHelper.hangup())
        .addInstruction(aceInstructionHelper.setCookie('cookie-name', 'cookie-value'))
        .addInstruction(aceInstructionHelper.startRecording(RECORDING_OPTIONS))
        .addInstruction(aceInstructionHelper.say('Hello from Sinch.', 'en-US'))
        .addInstruction(aceInstructionHelper.playFiles([
          '#tts[Hello from Sinch]',
          '#ssml[<speak><break time="250ms"/>Have a great day!</speak>]',
        ], 'en-US'))
        .build();
      const expectedResult: Voice.AceResponse = {
        action: {
          name: 'hangup',
        },
        instructions: [
          {
            name: 'setCookie',
            key: 'cookie-name',
            value: 'cookie-value',
          },
          {
            name: 'startRecording',
            options: {
              ...RECORDING_OPTIONS,
            },
          },
          {
            name: 'say',
            text: 'Hello from Sinch.',
            locale: 'en-US',
          },
          {
            name: 'playFiles',
            ids: ['#tts[Hello from Sinch]', '#ssml[<speak><break time="250ms"/>Have a great day!</speak>]'],
            locale: 'en-US',
          },
        ],
      };
      expect(aceResponse).toEqual(expectedResult);
    });
  });

  describe('ICE response builder', () => {
    it('should build an ICE response', () => {
      const parkProps: Voice.ParkProps = {
        introPrompt: '#tts[Welcome]',
        holdPrompt: '#tts[Thank you for your patience, your call is very important to us.]',
        maxDuration: 180,
      };
      const iceResponse = new IceSvamletBuilder()
        .setAction(iceActionHelper.park(parkProps))
        .addInstruction(iceInstructionHelper.setCookie('sinch-app', 'app-id-value'))
        .build();
      const expectedResult: Voice.IceResponse = {
        action: {
          name: 'park',
          ...parkProps,
        },
        instructions: [
          {
            name: 'setCookie',
            key: 'sinch-app',
            value: 'app-id-value',
          },
        ],
      };
      expect(iceResponse).toEqual(expectedResult);
    });
  });

  describe('PIE response builder', () => {
    it('should build a PIE response', () => {
      const pieResponse = new PieSvamletBuilder()
        .setAction(pieActionHelper.continue())
        .addInstruction(pieInstructionHelper.say('The call may be recorded.', 'en-US'))
        .addInstruction(pieInstructionHelper.startRecording(RECORDING_OPTIONS))
        .build();
      const expectedResult: Voice.PieResponse = {
        action: {
          name: 'continue',
        },
        instructions: [
          {
            name: 'say',
            text: 'The call may be recorded.',
            locale: 'en-US',
          },
          {
            name: 'startRecording',
            options: RECORDING_OPTIONS,
          },
        ],
      };
      expect(pieResponse).toEqual(expectedResult);
    });
  });

  describe('Custom callout helper', () => {
    it('should build a SVAML ICE string with only an action', () => {
      const ice = customCalloutHelper.formatIceResponse(
        iceActionHelper.park({}),
      );
      const expectedResult: Voice.IceResponse = {
        action: {
          name: 'park',
        },
      };
      expect(ice).toBe(JSON.stringify(expectedResult));
    });

    it('should build a SVAML ICE string with an action and instructions', () => {
      const ice = customCalloutHelper.formatIceResponse(
        iceActionHelper.park({}),
        iceInstructionHelper.setCookie('cookie-name', 'cookie-value'),
        iceInstructionHelper.say('Hello from Sinch.', 'Gwyneth'),
      );
      const expectedResult: Voice.IceResponse = {
        action: {
          name: 'park',
        },
        instructions: [
          {
            name: 'setCookie',
            key: 'cookie-name',
            value: 'cookie-value',
          },
          {
            name: 'say',
            text: 'Hello from Sinch.',
            locale: 'Gwyneth',
          },
        ],
      };
      expect(ice).toBe(JSON.stringify(expectedResult));
    });

    it('should build a SVAML ACE string with only an action', () => {
      const ace = customCalloutHelper.formatAceResponse(
        aceActionHelper.continue(),
      );
      const expectedResult: Voice.AceResponse = {
        action: {
          name: 'continue',
        },
      };
      expect(ace).toBe(JSON.stringify(expectedResult));
    });

    it('should build a SVAML ACE string with an action and instructions', () => {
      const ace = customCalloutHelper.formatAceResponse(
        aceActionHelper.continue(),
        aceInstructionHelper.setCookie('cookie-name', 'cookie-value'),
        aceInstructionHelper.say('Hello from Sinch.', 'Geraint'),
      );
      const expectedResult: Voice.AceResponse = {
        action: {
          name: 'continue',
        },
        instructions: [
          {
            name: 'setCookie',
            key: 'cookie-name',
            value: 'cookie-value',
          },
          {
            name: 'say',
            text: 'Hello from Sinch.',
            locale: 'Geraint',
          },
        ],
      };
      expect(ace).toBe(JSON.stringify(expectedResult));
    });

    it('should build a SVAML PIE string with only an action', () => {
      const pie = customCalloutHelper.formatPieResponse(
        pieActionHelper.continue(),
      );
      const expectedResult: Voice.PieResponse = {
        action: {
          name: 'continue',
        },
      };
      expect(pie).toBe(JSON.stringify(expectedResult));
    });

    it('should build a SVAML PIE string with an action and instructions', () => {
      const pie = customCalloutHelper.formatPieResponse(
        pieActionHelper.continue(),
        pieInstructionHelper.say('Goodbye.', 'Raveena'),
        pieInstructionHelper.stopRecording(),
      );
      const expectedResult: Voice.PieResponse = {
        action: {
          name: 'continue',
        },
        instructions: [
          {
            name: 'say',
            text: 'Goodbye.',
            locale: 'Raveena',
          },
          {
            name: 'stopRecording',
          },
        ],
      };
      expect(pie).toBe(JSON.stringify(expectedResult));
    });
  });
});
