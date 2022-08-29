import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from 'src/database/sequelize'; // 引入 Sequelize 实例
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  async create(requestBody: CreateProductDto) {
    const { name, description = '', detail = '', price = 0, stock = 0, image = '' } = requestBody;
    // console.log('----------->', name, price, stock, image, typeof price, typeof stock)
    const createSQL = `
      INSERT INTO shop_product
        (name, description, detail, price, stock, image)
      VALUES
        ('${name}', '${description}', '${detail}', ${price}, ${stock}, '${image}');
    `;
    await sequelize.query(createSQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }

  async findAll(requestBody: any) {
    const { pageIndex = 1, pageSize = 10, name = '' } = requestBody;
    // 分页查询条件
    const currentIndex =
      (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
    const queryListSQL = `
      SELECT
        id, name, image, detail, description,
        category_id, price, stock, status,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        shop_product
      WHERE
        name LIKE '%${name}%'
      ORDER BY
        id DESC
      LIMIT ${currentIndex}, ${pageSize}
    `;
    const productList: any[] = await sequelize.query(queryListSQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });

    // 统计数据条数
    const countListSQL = `
      SELECT
        COUNT(*) AS total
      FROM
        shop_product
      WHERE
        name LIKE '%${name}%'
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
        list: productList,
        total: count.total,
      },
    };
  }

  async findOne(id: number) {
    const queryListSQL = `
      SELECT
        id, name, image, detail, description,
        category_id, price, stock, status,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        shop_product
      WHERE
        id = '${id}'
    `;
    const productList: any[] = await sequelize.query(queryListSQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });

    return {
      code: 200,
      data: productList[0],
    };
  }

  async update(id: number, requestBody: UpdateProductDto) {
    const { name, description, detail, price, stock, image } = requestBody;

    const updateSQL = `
      UPDATE
        shop_product
      SET
        name = '${name}',
        description = '${description}',
        detail = '${detail}',
        price = ${price},
        stock = ${stock},
        image = '${image}'
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

  async remove(id: number) {
    const deleteSQL = `
      DELETE FROM
        shop_product
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
