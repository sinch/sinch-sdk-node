import { Injectable } from '@nestjs/common';
import {
  FaxBase64File,
  FaxCompletedEventJson,
  FaxWebhookEventParsed,
  IncomingFaxEventJson,
} from '@sinch/sdk-core';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FaxService {

  handleEvent(event: FaxWebhookEventParsed, contentType?: string, file?: Express.Multer.File): void {
    if (contentType === 'application/json') {
      console.log(`** application/json\n${event.event}: ${event.fax!.id} - ${event.eventTime}`);
      if (event.event === 'INCOMING_FAX') {
        const incomingFaxEvent = event as IncomingFaxEventJson;
        this.saveBase64File(incomingFaxEvent, event.fax!.id!);
      }
      if (event.event === 'FAX_COMPLETED') {
        const faxCompletedEvent = event as FaxCompletedEventJson;
        for (const fileBase64 of faxCompletedEvent.files!) {
          this.saveBase64File(fileBase64, event.fax!.id!);
        }
      }
    } else if (contentType?.includes('multipart/form-data')) {
      console.log(`** multipart/form-data\n${event.event}: ${event.fax!.id} - ${event.eventTime}`);
      console.log('Saving file...');
      const filePath = path.join('./fax-upload', file!.originalname);
      fs.writeFileSync(filePath, file!.buffer);
      console.log('File saved! ' + filePath);
    }
  }

  private saveBase64File(fileBase64: FaxBase64File, faxId: string) {
    console.log('Saving file...');
    const filePath = path.join('./fax-upload', faxId + '.' + fileBase64.fileType!.toLowerCase());
    const buffer = Buffer.from(fileBase64.file!, 'base64');
    fs.writeFileSync(filePath, buffer);
    console.log('File saved! ' + filePath);
  }

}
