import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { NumbersService } from '../services/numbers.service';
import {
  NumbersCallbackWebhooks,
  SmsCallbackWebhooks,
  VerificationCallbackWebhooks,
  VoiceCallbackWebhooks,
} from '@sinch/sdk-core';
import { SmsService } from '../services/sms.service';
import { VerificationService } from '../services/verification.service';
import { VoiceService } from '../services/voice.service';
require('dotenv').config();

const SINCH_NUMBERS_CALLBACK_SECRET = process.env.SINCH_NUMBERS_CALLBACK_SECRET || '';
const SINCH_APPLICATION_KEY = process.env.SINCH_APPLICATION_KEY || '';
const SINCH_APPLICATION_SECRET = process.env.SINCH_APPLICATION_SECRET || '';

@Controller()
export class AppController {

  constructor(
    private readonly numbersService: NumbersService,
    private readonly smsService: SmsService,
    private readonly verificationService: VerificationService,
    private readonly voiceService: VoiceService) {}

  @Post('/numbers')
  public numbers(@Req() request: Request, @Res() res: Response) {
    // Initialize the class that will be used to validate the request and parse it
    const numbersCallbackWebhook = new NumbersCallbackWebhooks(SINCH_NUMBERS_CALLBACK_SECRET);
    // 1 - The first thing to do is to verify the request is legit and has not been tampered
    const validated = numbersCallbackWebhook.validateRequestIntegrity(
      request.headers, request['rawBody']);
    if (!validated) {
      res.status(401).send('Invalid signature');
      return;
    }
    try {
      // 2 - Before acting on the request, it must be parsed to verify it's supported and to revive its content
      const event = numbersCallbackWebhook.parseNumbersEventNotification(request.body);
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
      const event = smsCallbackWebhooks.parseSmsEventNotification(eventBody);
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
    const validated = verificationCallbackWebhooks.validateAuthorizationHeader(
      request.headers, request.path, request['rawBody'], request.method);
    if (!validated) {
      res.status(401).send('Invalid authorization');
      return;
    }
    try {
      // 2 - Before acting on the request, it must be parsed to verify it's supported and to revive its content
      const event = verificationCallbackWebhooks.parseVerificationEventNotification(request.body);
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
    const validated = voiceCallbackWebhooks.validateAuthorizationHeader(
        request.headers, request.path, request['rawBody'], request.method);
    if (!validated) {
      res.status(401).send('Invalid authorization');
      return;
    }
    try {
      // 2 - Before acting on the request, it must be parsed to verify it's supported and to revive its content
      const event = voiceCallbackWebhooks.parseVoiceEventNotification(request.body);
      // 3 - Once steps 1 and 2 are ok, delegate the event management to the Voice service
      this.voiceService.handleEvent(event, res);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }
}
