import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  CalloutRequestEventResponse,
  FlashCallRequestEventResponse,
  SMSRequestEventResponse,
  VerificationCallback,
  VerificationRequestEvent,
  VerificationResultEvent,
} from '@sinch/sdk-core';

@Injectable()
export class VerificationEventService {

  handleEvent(event: VerificationCallback, res: Response) {
    console.log(`:: INCOMING EVENT :: ${event.event}`);
    switch (event.event) {
      case 'VerificationRequestEvent':
        return this.handleVerificationRequestEvent(event as VerificationRequestEvent, res);
      case 'VerificationResultEvent':
        return this.handleVerificationResultEvent(event as VerificationResultEvent, res);
      default:
        throw new Error(`Unexpected event: ${JSON.stringify(event)}`);
    }
  }

  private handleVerificationRequestEvent(event: VerificationRequestEvent, res: Response) {
    switch (event.method) {
      case 'sms':
        const smsRequestEventResponse: SMSRequestEventResponse = {
          action: 'allow',
          sms: {
            code: '123456'
          }
        };
        res.status(200).json(smsRequestEventResponse);
        break;
      case 'callout':
        const calloutRequestEventResponse: CalloutRequestEventResponse = {
          action: 'allow',
          callout: {
            code: '123456',
            speech: {
              locale: 'en-US'
            }
          }
        };
        res.status(200).json(calloutRequestEventResponse);
        break;
      case 'flashcall':
        const flashcallRequestEventResponse: FlashCallRequestEventResponse = {
          action: 'allow',
          flashCall: {
            dialTimeout: 5000
          }
        }
        res.status(200).json(flashcallRequestEventResponse);
        break;
      default:
        throw new Error(`Unexpected verification request method: ${event.method}`)
    }
  }

  private handleVerificationResultEvent(event: VerificationResultEvent, res: Response) {
    console.log(`Result of the verification:\n - method: ${event.method}\n - identity: ${event.identity.endpoint}\n - status: ${event.status}\n - reason: ${event.reason}`)
    res.status(200).send();
  }
}
