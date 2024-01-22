import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { NumbersService } from './services/numbers.service';
import { SmsService } from './services/sms.service';
import { VerificationService } from './services/verification.service';
import { VoiceService } from './services/voice.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    NumbersService,
    SmsService,
    VerificationService,
    VoiceService,
  ],
})
export class AppModule {}
