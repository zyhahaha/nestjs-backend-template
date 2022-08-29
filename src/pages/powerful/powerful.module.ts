import { Module } from '@nestjs/common';
import { PowerfulService } from './powerful.service';
import { PowerfulController } from './powerful.controller';

@Module({
  controllers: [PowerfulController],
  providers: [PowerfulService]
})
export class PowerfulModule {}
