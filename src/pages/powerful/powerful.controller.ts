import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PowerfulService } from './powerful.service';
import { CreatePowerfulDto } from './dto/create-powerful.dto';
import { UpdatePowerfulDto } from './dto/update-powerful.dto';

@Controller('powerful')
export class PowerfulController {
  constructor(private readonly powerfulService: PowerfulService) {}

  @Post()
  async create(@Body() createPowerfulDto: CreatePowerfulDto) {
    return await this.powerfulService.create(createPowerfulDto);
  }

  @Post('/list')
  async findAll(@Body() body: any) {
    return await this.powerfulService.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.powerfulService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePowerfulDto: UpdatePowerfulDto) {
    return this.powerfulService.update(+id, updatePowerfulDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.powerfulService.remove(+id);
  }
}
