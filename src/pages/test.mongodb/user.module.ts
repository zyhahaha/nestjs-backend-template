import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
@Module({
    // 这里的 name:'User' 为数据库表名称与 service 中注入的表名称对应两者不一样会报错
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
})
export class TestMongodbModule { }
