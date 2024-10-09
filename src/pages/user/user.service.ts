import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from 'src/database/sequelize'; // 引入 Sequelize 实例

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

  // 获取文章列表
  async findAll(requestBody): Promise<any> {
    const { pageIndex = 1, pageSize = 10, account = '', mobile = '' } = requestBody;
    // 分页查询条件
    const pageOffsetSize = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
    
    const queryDb = await this.userRepository.createQueryBuilder('shop_user');
    queryDb.where("shop_user.username like :username", { username: `%${account}%` })
    .andWhere("shop_user.mobile like :mobile", { mobile: `%${mobile}%` })
    queryDb.orderBy('shop_user.id', 'DESC');

    const count = await queryDb.getCount();
    queryDb.limit(pageSize);
    queryDb.offset(pageOffsetSize);

    console.log(queryDb.getSql());

    const userList = await queryDb.getMany();
    return {
      code: 200,
      data: {
        list: userList,
        total: count,
      },
    };
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

    // const user = await this.findOne(accountName);
    // if (!user) {
    //   return {
    //     code: 400,
    //     msg: '用户不存在',
    //   };
    // }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码

    const updateSQL = `
      UPDATE
        shop_user
      SET
        password = '${hashPwd}',
        password_salt = '${salt}',
        password_origin = ${password}
      WHERE
        id = ${id}
    `;
    // const transaction = await sequelize.transaction();
    await sequelize.query(updateSQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }

  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        id, username, avatar, password, password_salt, mobile, role
      FROM
        shop_user
      WHERE
        username = '${username}'
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台
        })
      )[0];
      // 若查不到用户，则 user === undefined
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
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
    const registerSQL = `
      INSERT INTO shop_user
        (username, password, password_salt, password_origin, mobile, avatar, role)
      VALUES
        ('${accountName}', '${hashPwd}', '${salt}', '${password}', '${mobile}', '${avatar}', 3)
    `;
    try {
      await sequelize.query(registerSQL, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async remove(id: number) {
    const deleteSQL = `
      DELETE FROM
        shop_user
      WHERE
        id = ${id}
    `;
    await sequelize.query(deleteSQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }
}
