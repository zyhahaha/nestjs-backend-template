import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from 'src/database/sequelize'; // 引入 Sequelize 实例
import { CreatePowerfulDto } from './dto/create-powerful.dto';
import { UpdatePowerfulDto } from './dto/update-powerful.dto';

@Injectable()
export class PowerfulService {
  async create(requestBody: any) {
    const { type = 'IP', content = '', content_two = '', content_three = '' } = requestBody;
    const createSQL = `
      INSERT INTO powerful_table
        (type, content, content_two, content_three)
      VALUES
        ('${type}', '${content}', '${content_two}', '${content_three}');
    `;
    await sequelize.query(createSQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }

  async findAll(requestBody: any) {
    const { pageIndex = 1, pageSize = 10, type = 'CV_MESSAGE' } = requestBody;
    // 分页查询条件
    const currentIndex =
      (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
    const queryListSQL = `
      SELECT
        id, type, content, content_two, content_three, status,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        powerful_table
      WHERE
        type = '${type}'
      ORDER BY
        id DESC
      LIMIT ${currentIndex}, ${pageSize}
    `;
    const dataList: any[] = await sequelize.query(queryListSQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });

    // 统计数据条数
    const countListSQL = `
      SELECT
        COUNT(*) AS total
      FROM
        powerful_table
      WHERE
        type = '${type}'
    `;
    const count: any = (
      await sequelize.query(countListSQL, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false,
      })
    )[0];

    return {
      code: 200,
      data: {
        list: dataList,
        total: count.total,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} powerful`;
  }

  update(id: number, updatePowerfulDto: UpdatePowerfulDto) {
    return `This action updates a #${id} powerful`;
  }

  remove(id: number) {
    return `This action removes a #${id} powerful`;
  }
}
