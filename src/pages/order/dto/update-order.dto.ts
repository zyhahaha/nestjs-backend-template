import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
    @ApiProperty({ description: '订单状态', example: '1' })
    @IsNotEmpty({ message: '订单状态不能为空' })
    status: string;
}
