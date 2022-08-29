import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  //   @ApiProperty({ description: '商品Id', example: 9 })
  //   @IsNotEmpty({ message: '商品Id不能为空' })
  //   readonly id: number;

  @ApiProperty({ description: '商品名称', example: 'test' })
  @IsNotEmpty({ message: '商品名称不能为空' })
  readonly name: string;

  @ApiProperty({ description: '商品描述', example: 'description' })
  @IsNotEmpty({ message: '商品描述不能为空' })
  readonly description: string;

  @ApiProperty({ description: '商品详情', example: 'test' })
  @IsNotEmpty({ message: '商品详情不能为空' })
  readonly detail: string;

  @ApiProperty({ description: '商品价格', example: 9 })
  @IsNotEmpty({ message: '商品价格不能为空' })
  readonly price: number;

  @ApiProperty({ description: '商品库存', example: 9 })
  @IsNotEmpty({ message: '商品库存不能为空' })
  readonly stock: number;

  @ApiProperty({ description: '商品图片', example: 'url.png' })
  // @IsNotEmpty({ message: '商品库存不能为空' })
  readonly image: number;
}
