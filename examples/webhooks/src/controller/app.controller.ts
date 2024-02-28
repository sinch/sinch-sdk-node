import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import {
  ConversationCallbackWebhooks,
  FaxCallbackWebhooks,
  NumbersCallbackWebhooks,
  SmsCallbackWebhooks,
  VerificationCallbackWebhooks,
  VoiceCallbackWebhooks,
} from '@sinch/sdk-core';
import { NumbersService } from '../services/numbers.service';
import { SmsService } from '../services/sms.service';
import { VerificationService } from '../services/verification.service';
import { VoiceService } from '../services/voice.service';
import { ConversationService } from '../services/conversation.service';
import { FaxService } from '../services/fax.service';
require('dotenv').config();

// Const for Conversation API
const SINCH_CONVERSATION_APP_SECRET = process.env.SINCH_CONVERSATION_APP_SECRET || '';

// Const for Numbers API
const SINCH_NUMBERS_CALLBACK_SECRET = process.env.SINCH_NUMBERS_CALLBACK_SECRET || '';

// Const for Voice and Verification APIs
const SINCH_APPLICATION_KEY = process.env.SINCH_APPLICATION_KEY || '';
const SINCH_APPLICATION_SECRET = process.env.SINCH_APPLICATION_SECRET || '';

@Controller()
export class AppController {

  constructor(
    private readonly conversationService: ConversationService,
    private readonly faxService: FaxService,
    private readonly numbersService: NumbersService,
    private readonly smsService: SmsService,
    private readonly verificationService: VerificationService,
    private readonly voiceService: VoiceService) {}

  @Post('/conversation')
  public conversation(@Req() request: Request, @Res() res: Response) {
    // Initialize the class that will be used to validate the request and parse it
    const conversationCallbackWebhook = new ConversationCallbackWebhooks(SINCH_CONVERSATION_APP_SECRET);
    // 1 - The first thing to do is to verify the request is legit and has not been tampered with
    const validated = conversationCallbackWebhook.validateAuthenticationHeader(request.headers, request['rawBody']);
    if (!validated) {
      res.status(401).send('Invalid webhook signature');
      return;
    }
    try {
      // 2 - Before acting on the request, it must be parsed to verify it's supported and to revive its content
      const event = conversationCallbackWebhook.parseEvent(request.body);
      // 3 - Once steps 1 and 2 are ok, delegate the event management to the Conversation service
      this.conversationService.handleEvent(event);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  @Post('/fax')
  @UseInterceptors(FileInterceptor('file'))
  public fax(@UploadedFile() file: Express.Multer.File, @Req() request: Request, @Res() res: Response) {
    console.log(request.headers);
    console.log(request.body);
    console.log(file);
    // Initialize the class that will be used to validate the request and parse it
    const faxCallbackWebhook = new FaxCallbackWebhooks();
    try {
      // There is no request validation for the SMS API, so we can parse it and revive its content directly
      const event = faxCallbackWebhook.parseEvent(request.body);
      // Once the request has been revived, delegate the event management to the SMS service
      const contentType = request.headers['content-type'];
      this.faxService.handleEvent(event, contentType, file);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  @Post('/numbers')
  public numbers(@Req() request: Request, @Res() res: Response) {
    // Initialize the class that will be used to validate the request and parse it
    const numbersCallbackWebhook = new NumbersCallbackWebhooks(SINCH_NUMBERS_CALLBACK_SECRET);
    // 1 - The first thing to do is to verify the request is legit and has not been tampered
    const validated = numbersCallbackWebhook.validateAuthenticationHeader(
      request.headers, request['rawBody']);
    if (!validated) {
      res.status(401).send('Invalid signature');
      return;
    }
    try {
      // 2 - Before acting on the request, it must be parsed to verify it's supported and to revive its content
      const event = numbersCallbackWebhook.parseEvent(request.body);
      // 3 - Once steps 1 and 2 are ok, delegate the event management to the Numbers service
      this.numbersService.handleEvent(event);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  @Post('/sms')
  public sms(@Body() eventBody: any, @Res() res: Response) {
    const smsCallbackWebhooks = new SmsCallbackWebhooks();
    try {
      // There is no request validation for the SMS API, so we can parse it and revive its content directly
      const event = smsCallbackWebhooks.parseEvent(eventBody);
      // Once the request has been revived, delegate the event management to the SMS service
      this.smsService.handleEvent(event);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  @Post('/verification')
  public verification(@Req() request: Request, @Res() res: Response) {
    // Initialize the class that will be used to validate the request and parse it
    const verificationCallbackWebhooks = new VerificationCallbackWebhooks({
      applicationKey: SINCH_APPLICATION_KEY,
      applicationSecret: SINCH_APPLICATION_SECRET
    });
    // 1 - The first thing to do is to verify the request is legit and has not been tampered
    const validated = verificationCallbackWebhooks.validateAuthenticationHeader(
      request.headers, request['rawBody'], request.path, request.method);
    if (!validated) {
      res.status(401).send('Invalid authorization');
      return;
    }
    try {
      // 2 - Before acting on the request, it must be parsed to verify it's supported and to revive its content
      const event = verificationCallbackWebhooks.parseEvent(request.body);
      // 3 - Once steps 1 and 2 are ok, delegate the event management to the Verifications service
      this.verificationService.handleEvent(event, res);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  @Post('/voice')
  public voice (@Req() request: Request, @Res() res: Response) {
    // Initialize the class that will be used to validate the request and parse it
    const voiceCallbackWebhooks = new VoiceCallbackWebhooks({
      applicationKey: SINCH_APPLICATION_KEY,
      applicationSecret: SINCH_APPLICATION_SECRET
    });
    // 1 - The first thing to do is to verify the request is legit and has not been tampered
    const validated = voiceCallbackWebhooks.validateAuthenticationHeader(
      request.headers, request['rawBody'], request.path, request.method);
    if (!validated) {
      res.status(401).send('Invalid authorization');
      return;
    }
    try {
      // 2 - Before acting on the request, it must be parsed to verify it's supported and to revive its content
      const event = voiceCallbackWebhooks.parseEvent(request.body);
      // 3 - Once steps 1 and 2 are ok, delegate the event management to the Voice service
      this.voiceService.handleEvent(event, res);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

}
