import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { NumbersService } from '../services/numbers.service';
import {
  parseNumbersEventNotification,
  parseSmsEventNotification,
  parseVerificationEventNotification,
  parseVoiceEventNotification,
  validateAuthenticationHeader,
} from '@sinch/sdk-core';
import { SmsService } from '../services/sms.service';
import { VerificationService } from '../services/verification.service';
import { VoiceService } from '../services/voice.service';
require('dotenv').config();

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
  public numbers(@Body() eventBody: any, @Res() res: Response) {
    // console.log(eventBody);
    try {
      const event = parseNumbersEventNotification(eventBody);
      this.numbersService.handleEvent(event);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  @Post('/sms')
  public sms(@Body() eventBody: any, @Res() res: Response) {
    // console.log(eventBody);
    try {
      const event = parseSmsEventNotification(eventBody);
      this.smsService.handleEvent(event);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  @Post('/verification')
  public verification(@Req() request: Request, @Res() res: Response) {
    // console.log(request.headers);
    // console.log(request.body);
    // console.log(request['rawBody']);
    const validated = validateAuthenticationHeader(SINCH_APPLICATION_KEY, SINCH_APPLICATION_SECRET,
      request.headers, request.path, request['rawBody'], request.method);
    if (!validated) {
      res.status(401).send('Invalid authorization');
      return;
    }
    try {
      const event = parseVerificationEventNotification(request.body);
      this.verificationService.handleEvent(event, res);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  @Post('/voice')
  public voice (@Req() request: Request, @Res() res: Response) {
    // console.log(request.headers);
    // console.log(request.body);
    // console.log(request['rawBody']);
    const validated = validateAuthenticationHeader(SINCH_APPLICATION_KEY, SINCH_APPLICATION_SECRET,
        request.headers, request.path, request['rawBody'], request.method);
    if (!validated) {
      res.status(401).send('Invalid authorization');
      return;
    }

    try {
      const event = parseVoiceEventNotification(request.body);
      this.voiceService.handleEvent(event, res);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }
}
