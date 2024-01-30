import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationService {

  handleEvent(event: string): void {
    console.log(event);
  }
}
