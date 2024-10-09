import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UsePipes,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { LoginDTO, RegisterInfoDTO } from './dto/user.dto'; // 引入 DTO
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth() // Swagger 的 JWT 验证
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) { }
  
  // 添加用户
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    // 指定 DTO类型
    return await this.usersService.register(body);
  }

  // 查询用户列表
  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('list')
  async findAll(@Body() body: any) {
    return await this.usersService.findAll(body);
  }

  // 删除用户
  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  // 修改用户密码
  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Patch('/updatepw/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: any,
  ) {
    return await this.usersService.updatePW(+id, updateProductDto);
  }

  // 用户登录
  @Post('login') // JWT验证 - Step 1: 用户请求登录
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  async login(@Body() loginParmas: LoginDTO) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 400,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 400,
          msg: `查无此人`,
        };
    }
  }
}
