import { Injectable } from '@nestjs/common';
import { NumbersCallback } from '@sinch/sdk-core';

@Injectable()
export class NumbersEventService {

  handleEvent(event: NumbersCallback): void {
    const eventType = event.eventType;
    console.log(`:: INCOMING EVENT :: ${eventType}`);
    switch (eventType) {
      case 'PROVISIONING_TO_CAMPAIGN':
        break;
      case 'PROVISIONING_TO_SMS_PLATFORM':
        console.log(`The number ${event.resourceId} (${event.resourceType}) has been provisioned to the SMS platform with the status: ${event.status}`);
        break;
      case 'PROVISIONING_TO_VOICE_PLATFORM':
        console.log(`The number ${event.resourceId} (${event.resourceType}) has been provisioned to the Voice platform with the status: ${event.status}`);
        break;
      case 'DEPROVISIONING_FROM_CAMPAIGN':
        break;
      case 'DEPROVISIONING_FROM_SMS_PLATFORM':
        console.log(`The number ${event.resourceId} (${event.resourceType}) has been deprovisioned from the SMS platform with the status: ${event.status}`);
        break;
      case 'DEPROVISIONING_FROM_VOICE_PLATFORM':
        console.log(`The number ${event.resourceId} (${event.resourceType}) has been deprovisioned from the Voice platform with the status: ${event.status}`);
        break;
      default:
        throw new Error(`Unexpected event type: ${eventType}`);
    }
  }
}
