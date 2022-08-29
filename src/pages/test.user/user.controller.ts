/* user.controller.ts */
// 引入 Nest.js 内置的各个功能
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
// 引入用户服务
import { UserService } from './user.service';
// 引入创建用户 DTO 用于限制从接口处传来的参数
import { RegisterInfoDTO } from './dto/user.dto';
// 配置局部路由
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    // 创建user路由 user/createUser
    @Post('createUser')
    async createUser(@Body() body: RegisterInfoDTO) {
        return this.userService.create(body);
    }
    //查找所有 user 路由
    @Get('findAll')
    async findAll() {
        return this.userService.findAll();
    }
    // 查找某一个用户路由
    @Get('findOne')
    async findOne(@Query() query: any) {
        return this.userService.findOne(query.name);
    }
    // 删除一个用户的路由
    @Delete(':sid')
    deleteUser(@Param() param: any) {
        return this.userService.delete(param.sid);
    }
    // 更改用户信息的路由
    @Put(':sid')
    updateUser(@Body() body: any, @Param() param: any) {
        return this.userService.updateUser(param.sid, body);
    }
}
