import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

import { makeSalt, encryptPassword } from 'src/utils/cryptogram'; // 引入加密函数

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  // 获取列表
  async findAll(requestBody): Promise<any> {
    const { pageIndex = 1, pageSize = 10, account = '', mobile = '' } = requestBody;
    // 分页查询条件
    const pageOffsetSize = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
    
    const queryDb = await this.userRepository.createQueryBuilder();
    queryDb.where("username like :username", { username: `%${account}%` })
    .andWhere("mobile like :mobile", { mobile: `%${mobile}%` })
    queryDb.orderBy('id', 'DESC');

    const count = await queryDb.getCount();
    queryDb.limit(pageSize);
    queryDb.offset(pageOffsetSize);

    // console.log(queryDb.getSql());

    const userList = await queryDb.getMany();
    return {
      code: 200,
      data: {
        list: userList,
        total: count,
      },
    };
  }

  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    const queryDb = await this.userRepository.createQueryBuilder('shop_user');
    queryDb.where("shop_user.username = :username", { username });
    const userList = await queryDb.getMany();
    return userList[0];
  }

  // 修改密码
  async updatePW(id: number, requestBody: any) {
    const { password, repassword } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    this.userRepository.update(id, { password: hashPwd, password_salt: salt, password_origin: password })
    return {
      code: 200,
      msg: 'Success',
    };
  }

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, password, repassword, mobile, avatar } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码

    this.userRepository.insert({
      username: accountName,
      password: hashPwd,
      password_salt: salt,
      password_origin: password,
      role: 3
    })

    return {
      code: 200,
      msg: 'Success',
    };
  }

  async remove(id: number) {
    this.userRepository.delete(id)
    return {
      code: 200,
      msg: 'Success',
    };
  }
}
