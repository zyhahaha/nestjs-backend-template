import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MailerModule as mailerMe } from '@nestjs-modules/mailer';
// import mailerConfig from 'src/config/mailer'

@Module({
  controllers: [MailerController],
  providers: [MailerService],
  imports: [
    mailerMe.forRoot({
      // transport: mailerConfig.smtps,
      defaults: {
        from: '"邮件提醒" <18355403288@163.com>',
      }
    })
  ]
})
export class MailerModule {}
