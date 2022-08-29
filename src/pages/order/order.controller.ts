import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('订单')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Post('/confirm/:id')
  async confirm(@Param('id') id: string) {
    return await this.orderService.update(+id, {status: 1});
  }

  // @Get('/confirm/:id')
  // async findConfirm(@Param('id') id: string) {
  //   return await this.orderService.findConfirm(+id);
  // }

  @Post('/list')
  async findAll(@Body() body: any) {
    return await this.orderService.findAll(body);
  }

  @Get('/ipv6/:id')
  saveIpv6(@Param('id') id: string) {
    return this.orderService.saveIpv6(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
