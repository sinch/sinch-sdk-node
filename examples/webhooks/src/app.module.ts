import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './controller/app.controller';
import { NumbersService } from './services/numbers.service';
import { SmsService } from './services/sms.service';
import { VerificationService } from './services/verification.service';
import { VoiceService } from './services/voice.service';
import { ConversationService } from './services/conversation.service';
import { FaxService } from './services/fax.service';

@Module({
  imports: [
    MulterModule.register({}),
  ],
  controllers: [AppController],
  providers: [
    ConversationService,
    FaxService,
    NumbersService,
    SmsService,
    VerificationService,
    VoiceService,
  ],
})
export class AppModule {}
