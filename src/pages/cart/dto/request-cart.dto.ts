import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RequestCartDto {
  @ApiProperty({ description: '用户id', example: '123' })
//   @IsNotEmpty({ message: '用户id不能为空' })
  readonly user_id: string;

  @ApiProperty({ description: '当前页面', example: 1 })
  readonly pageIndex: string;

  @ApiProperty({ description: '分页数量', example: 10 })
  readonly pageSize: number;
}
