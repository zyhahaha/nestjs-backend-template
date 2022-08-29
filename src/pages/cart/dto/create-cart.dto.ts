import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({ description: '用户id', example: '123' })
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly user_id: string;

  @ApiProperty({ description: '商品id', example: '123' })
  @IsNotEmpty({ message: '商品id不能为空' })
  readonly product_id: string;

  @ApiProperty({ description: '商品数量', example: 1 })
  @IsNotEmpty({ message: '商品数量不能为空' })
  readonly quantity: number;
}
