import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from 'src/database/sequelize'; // 引入 Sequelize 实例
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  async create(requestBody: CreateCartDto) {
    const { user_id, product_id, quantity = 0 } = requestBody;
    const createSQL = `
      INSERT INTO shop_cart
        (user_id, product_id, quantity)
      VALUES
        ('${user_id}', '${product_id}', '${quantity}');
    `;
    await sequelize.query(createSQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }

  async findAll(requestBody: any) {
    const { pageIndex = 1, pageSize = 10, user_id = '' } = requestBody;
    // 分页查询条件
    const currentIndex =
      (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
    const queryListSQL = `
      SELECT
        id, user_id, product_id, quantity,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        shop_cart
      WHERE
        user_id = '${user_id}'
      ORDER BY
        id DESC
      LIMIT ${currentIndex}, ${pageSize}
    `;
    // const queryListSQL = `SELECT * FROM shop_cart c INNER JOIN shop_product p ON c.product_id=p.id WHERE user_id=3`
    const cartList: any[] = await sequelize.query(queryListSQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });

    // 统计数据条数
    const countListSQL = `
      SELECT
        COUNT(*) AS total
      FROM
        shop_cart
      WHERE
        user_id = '${user_id}'
    `;
    const count: any = (
      await sequelize.query(countListSQL, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false,
      })
    )[0];

    // 关联查询product
    let handleCartItem = async cartItem => {
      const productItem = (await this.findRelationProduct([cartItem.product_id]))[0]
      // console.log('p i ------------->', productItem, cartItem.product_id)
      if (!productItem) return true

      cartItem.goods_name = productItem.name
      cartItem.goods_image = productItem.image
      cartItem.goods_price = productItem.price
    }
    let queryAllPromise = () => {
      let promiseList = []
      cartList.forEach(cartItem => {
        promiseList.push(handleCartItem(cartItem))
      })
      return new Promise((resolve, reject) => {
        Promise.all(promiseList).then(values => {
          resolve(values)
        })
      })
    }
    await queryAllPromise()

    // cartList.forEach(async item => {
    //   console.log('---------->cart', item)
    //   const queryListSQL = `
    //     SELECT
    //       id, name, image, price,
    //       DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
    //       DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
    //     FROM
    //       shop_product
    //     WHERE
    //       id = ${item.product_id}
    //   `;
    //   const list: any[] = await sequelize.query(queryListSQL, {
    //     type: Sequelize.QueryTypes.SELECT,
    //     raw: true,
    //     logging: false,
    //   });
    //   const productResult = list[0]
    //   console.log('---------->pro', productResult)
    //   if (productResult) {
    //     item.goods_name = productResult.name
    //     item.goods_image = productResult.image
    //     item.goods_price = productResult.price
    //   }
    // })

    return {
      code: 200,
      data: {
        list: cartList,
        total: count.total,
      },
    };
  }

  async findRelationProduct(ids){
    let whereStr = ''
    ids.forEach((id, index) => {
      if (index === 0) {
        whereStr += `id=${id}`
      } else {
        whereStr += ` OR id=${id}`
      }
    })
    const querySQL = `
      SELECT
        id, name, image, detail, description,
        category_id, price, stock, status,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        shop_product
      WHERE
        ${whereStr}
    `;
    const productList: any[] = await sequelize.query(querySQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: true,
    });
    // console.log(productList)
    return productList
  }

  // async findOne(id: number) {
  //   const queryListSQL = `
  //     SELECT
  //       id, user_id, product_id, quantity,
  //       DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
  //       DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
  //     FROM
  //       shop_cart
  //     WHERE
  //       id = '${id}'
  //   `;
  //   const productList: any[] = await sequelize.query(queryListSQL, {
  //     type: Sequelize.QueryTypes.SELECT,
  //     raw: true,
  //     logging: false,
  //   });

  //   return {
  //     code: 200,
  //     data: productList[0],
  //   };
  // }

  async update(id: number, requestBody: UpdateCartDto) {
    const { quantity } = requestBody;

    const updateSQL = `
      UPDATE
        shop_cart
      SET
        quantity = ${quantity}
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
        shop_cart
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
