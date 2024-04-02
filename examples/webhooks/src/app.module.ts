import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './controller/app.controller';
import { NumbersEventService } from './services/numbers-event.service';
import { SmsEventService } from './services/sms-event.service';
import { VerificationEventService } from './services/verification-event.service';
import { VoiceEventService } from './services/voice-event.service';
import { ConversationEventService } from './services/conversation-event.service';
import { FaxEventService } from './services/fax-event.service';

@Module({
  imports: [
    MulterModule.register({}),
  ],
  controllers: [AppController],
  providers: [
    ConversationEventService,
    FaxEventService,
    NumbersEventService,
    SmsEventService,
    VerificationEventService,
    VoiceEventService,
  ],
})
export class AppModule {}
