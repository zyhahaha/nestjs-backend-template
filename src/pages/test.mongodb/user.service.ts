import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterInfoDTO } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserService {
    // 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中:
    constructor(@InjectModel('User') private userTest: Model<UserDocument>) { }
    // 添加
    async create(createUserDto: RegisterInfoDTO): Promise<User> {
        const createUser = new this.userTest(createUserDto);
        const temp = await createUser.save();
        return temp;
    }
    // 查找
    async findAll(): Promise<User[]> {
        // 这里是异步的
        const temp = await this.userTest.find().exec();
        return temp;
    }
    // 查找
    async findOne(name: string): Promise<User[]> {
        // 这里是异步的
        const temp = await this.userTest.find({ name });
        return temp;
    }
    // 删除
    async delete(sid: number) {
        // 这里是异步的  remove 方法删除成功并返回相应的个数
        // const temp = await this.userTest.remove({ _id: sid });
        const temp = 'ok'
        return temp;
    }
    // 修改
    async updateUser(sid: string, data: any) {
        // 这里是异步的  remove 方法删除成功并返回相应的个数
        const temp = await this.userTest.updateOne({ _id: sid }, { $set: data });
        return temp;
    }
}
