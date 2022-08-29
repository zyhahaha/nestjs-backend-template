import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: '用户id', example: '123' })
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly user_id: string;

  @ApiProperty({ description: '商品列表', example: '[{"id":2,"quantity":33}]' })
  product_list: string;
}
