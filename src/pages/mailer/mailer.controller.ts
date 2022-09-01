import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('邮件')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get()
  async findAll() {
    // return this.mailerService.findAll();
    return await this.mailerService.send('toEmail', 'subject');
  }
}
