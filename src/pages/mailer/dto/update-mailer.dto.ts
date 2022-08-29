import { PartialType } from '@nestjs/swagger';
import { CreateMailerDto } from './create-mailer.dto';

export class UpdateMailerDto extends PartialType(CreateMailerDto) {}
