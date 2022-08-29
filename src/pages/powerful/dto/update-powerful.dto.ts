import { PartialType } from '@nestjs/swagger';
import { CreatePowerfulDto } from './create-powerful.dto';

export class UpdatePowerfulDto extends PartialType(CreatePowerfulDto) {}
