import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { NumbersService } from './services/numbers.service';
import { SmsService } from './services/sms.service';
import { VerificationService } from './services/verification.service';
import { VoiceService } from './services/voice.service';
import { ConversationService } from './services/conversation.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    ConversationService,
    NumbersService,
    SmsService,
    VerificationService,
    VoiceService,
  ],
})
export class AppModule {}
