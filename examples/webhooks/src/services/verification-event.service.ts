import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Verification } from '@sinch/sdk-core';

@Injectable()
export class VerificationEventService {

  handleEvent(event: Verification.VerificationCallbackEvent, res: Response) {
    console.log(`:: INCOMING EVENT :: ${event.event}`);
    switch (event.event) {
      case 'VerificationRequestEvent':
        return this.handleVerificationRequestEvent(event as Verification.VerificationRequestEvent, res);
      case 'VerificationResultEvent':
        return this.handleVerificationResultEvent(event as Verification.VerificationResultEvent, res);
      default:
        throw new Error(`Unexpected event: ${JSON.stringify(event)}`);
    }
  }

  private handleVerificationRequestEvent(event: Verification.VerificationRequestEvent, res: Response) {
    switch (event.method) {
      case 'sms':
        const smsRequestEventResponse: Verification.SmsRequestEventResponse = {
          action: 'allow',
          sms: {
            code: '123456'
          }
        };
        res.status(200).json(smsRequestEventResponse);
        break;
      case 'callout':
        const calloutRequestEventResponse: Verification.CalloutRequestEventResponse = {
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
        const flashcallRequestEventResponse: Verification.FlashCallRequestEventResponse = {
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

  private handleVerificationResultEvent(event: Verification.VerificationResultEvent, res: Response) {
    console.log(`Result of the verification:\n - method: ${event.method}\n - identity: ${event.identity.endpoint}\n - status: ${event.status}\n - reason: ${event.reason}`)
    res.status(200).send();
  }
}
