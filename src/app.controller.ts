import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/djh')
  getDJH(): string {
    return this.appService.getDJH();
  }

  @Get('/jdvsp')
  getJDVSP(): string {
    return this.appService.getJDVSP();
  }
}
