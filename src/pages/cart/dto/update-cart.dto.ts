import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCartDto {
    @ApiProperty({ description: '商品数量', example: 1 })
    @IsNotEmpty({ message: '商品数量不能为空' })
    readonly quantity: number;
}
