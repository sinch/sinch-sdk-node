import { Injectable } from '@nestjs/common';
import { Fax } from '@sinch/sdk-core';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FaxEventService {

  handleEvent(event: Fax.FaxWebhookEventParsed, contentType?: string, file?: Express.Multer.File): void {
    if (contentType === 'application/json') {
      console.log(`** application/json\n${event.event}: ${event.fax!.id} - ${event.eventTime}`);
      if (event.event === 'INCOMING_FAX') {
        const incomingFaxEvent = event as Fax.IncomingFaxEventJson;
        this.saveBase64File(incomingFaxEvent, event.fax!.id!);
      }
      if (event.event === 'FAX_COMPLETED') {
        const faxCompletedEvent = event as Fax.FaxCompletedEventJson;
        this.saveBase64File(faxCompletedEvent, event.fax!.id!);
      }
    } else if (contentType?.includes('multipart/form-data')) {
      console.log(`** multipart/form-data\n${event.event}: ${event.fax!.id} - ${event.eventTime}`);
      console.log('Saving file...');
      const filePath = path.join('./fax-upload', file!.originalname);
      fs.writeFileSync(filePath, file!.buffer);
      console.log('File saved! ' + filePath);
    }
  }

  private saveBase64File(event: Fax.IncomingFaxEventJson | Fax.FaxCompletedEventJson, faxId: string) {
    console.log('Saving file...');
    const filePath = path.join('./fax-upload', event.event + '-' + faxId + '.' + event.fileType!.toLowerCase());
    const buffer = Buffer.from(event.file!, 'base64');
    fs.writeFileSync(filePath, buffer);
    console.log('File saved! ' + filePath);
  }

}
