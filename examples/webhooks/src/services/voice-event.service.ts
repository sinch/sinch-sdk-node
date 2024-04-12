import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  VoiceCallback,
  Voice,
} from '@sinch/sdk-core';

@Injectable()
export class VoiceEventService {

  handleEvent(event: VoiceCallback, res: Response) {
    console.log(`:: INCOMING EVENT :: ${event.event}`);
    switch (event.event) {
      case 'ice':
        this.handleIceRequest(event as Voice.IceRequest, res);
        break;
      case 'ace':
        this.handleAceRequest(event as Voice.AceRequest, res);
        break;
      case 'dice':
        this.handleDiceRequest(event as Voice.DiceRequest, res);
        break;
      case 'pie':
        this.handlePieRequest(event as Voice.PieRequest, res);
        break;
      case 'notify':
        this.handleNotifyRequest(event as Voice.NotifyRequest, res);
        break;
      default:
        throw new Error(`Unexpected event: ${JSON.stringify(event)}`);
    }
  }

  private handleIceRequest(event: Voice.IceRequest, res: Response) {
    console.log(`ICE request: CLI = ${event.cli} - To = ${event.to?.endpoint} (${event.to?.type})`)
    const iceResponse = new Voice.IceSvamletBuilder()
      .setAction(Voice.iceActionHelper.hangup())
      .addInstruction(Voice.iceInstructionHelper.say('Thank you for calling Sinch! This call will now end.', 'en-US'))
      .build();
    res.status(200).json(iceResponse);
  }

  private handleAceRequest(event: Voice.AceRequest, res: Response) {
    console.log(`ACE request: Call answered at '${event.timestamp?.toISOString()}'`);
    const aceResponse = new Voice.AceSvamletBuilder()
      .setAction(Voice.aceActionHelper.runMenu({
        barge: true,
        menus: [
          {
            id: 'main',
            mainPrompt:'#tts[This is the main menu. Press 1 for support or 2 to continue to the next menu.]',
            options: [
              {
                dtmf: '1',
                action: 'return(support)'
              },
              {
                dtmf: '2',
                action: 'menu(sub)'
              }
            ]
          },
          {
            id: 'sub',
            mainPrompt: '#tts[This is the sub menu. Enter your 4-digit PIN]',
            repeatPrompt: '#tts[Please enter your 4-digit pin.]',
            repeats: 3,
            maxDigits: 4
          },
        ],
      }))
      .build();
    res.status(200).json(aceResponse);
  }

  private handleDiceRequest(event: Voice.DiceRequest, res: Response) {
    console.log(`DICE request: Call disconnected at '${event.timestamp?.toISOString()}' with the reason '${event.reason}'.`);
    res.status(200).send();
  }

  private handlePieRequest(event: Voice.PieRequest, res: Response) {
    console.log(`PIE request: IVR menu choice: '${event.menuResult?.value}'`);
    const pieResponse = new Voice.PieSvamletBuilder()
      .setAction(Voice.pieActionHelper.hangup())
      .addInstruction(Voice.pieInstructionHelper.say('Thanks for your input. The call will end after some music.'))
      .addInstruction(Voice.pieInstructionHelper.playFiles(['https://samples-files.com/samples/Audio/mp3/sample-file-4.mp3']))
      .build();
    res.status(200).send(pieResponse);
  }

  private handleNotifyRequest(event: Voice.NotifyRequest, res: Response) {
    console.log(`Notification received: "${event.type}"`);
    res.status(200).send();
  }
}
