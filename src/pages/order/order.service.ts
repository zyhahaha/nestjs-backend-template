import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from 'src/database/sequelize'; // 引入 Sequelize 实例

@Injectable()
export class OrderService {
  async saveIpv6(ipv6Address) {
    const createSQL = `
      INSERT INTO shop_file_map
        (name, type)
      VALUES
        ('${ipv6Address}', 'ipv6');
    `;
    const sqlResult = await sequelize.query(createSQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
      data: sqlResult
    }
  }

  async create(requestBody: CreateOrderDto) {
    const { user_id, product_list } = requestBody;
    const productList = JSON.parse(product_list)
    if (!productList.length) {
      return {
        code: 400,
        msg: '商品不能为空'
      }
    }
    const objMap = {}
    productList.forEach(v => {
      if (objMap[v.id]) {
        objMap[v.id] += v.quantity
      } else {
        objMap[v.id] = v.quantity
      }
    })
    const order_no = 'S' + Date.now();
    const createSQL = `
      INSERT INTO shop_order
        (user_id, order_no, order_status)
      VALUES
        ('${user_id}', '${order_no}', 0);
    `;
    const sqlResult = await sequelize.query(createSQL, { logging: false });
    product_list && JSON.parse(product_list).forEach((productItem) => {
      this.createDetailItem(order_no, productItem);
    });
    return {
      code: 200,
      msg: 'Success',
      data: {
        order_no,
        order_id: sqlResult[0]
      }
    };
  }

  async createDetailItem(order_no, productItem) {
    const { id = 0, quantity = 0 } =
      productItem;
    const createSQL = `
      INSERT INTO shop_order_item
        (order_no, product_id, quantity)
      VALUES
        ('${order_no}', '${id}', '${quantity}');
    `;
    await sequelize.query(createSQL, { logging: false });
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
      logging: false,
    });
    return productList
  }

  async findRelationOrderItem(orderResult){
    if (!orderResult) return true
    const queryListSQL = `
      SELECT
        id, product_id, quantity,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        shop_order_item
      WHERE
        order_no = '${orderResult.order_no}'
    `;
    const orderItemList: any[] = await sequelize.query(queryListSQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });

    const ids = orderItemList.map(v => v.product_id)
    const orderMap = {}
    orderItemList.map(v => {
      orderMap[v.product_id] = v.quantity
    })
    const productList = await this.findRelationProduct(ids)
    productList.forEach(item => {
      item.count = orderMap[item.id] || 0
    })
    orderResult.productList = productList
    return orderResult
  }

  async findAll(requestBody: any) {
    const { pageIndex = 1, pageSize = 10, user_id = '', order_status = '' } = requestBody;
    // 分页查询条件
    const currentIndex =
      (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
    const queryListSQL = `
      SELECT
        id, user_id, order_no, order_status,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        shop_order
      WHERE
        user_id LIKE '%${user_id}%'
        AND
        order_status LIKE '%${order_status}%'
      ORDER BY
        id DESC
      LIMIT ${currentIndex}, ${pageSize}
    `;
    const orderList: any[] = await sequelize.query(queryListSQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });

    // 统计数据条数
    const countListSQL = `
      SELECT
        COUNT(*) AS total
      FROM
        shop_order
      WHERE
        user_id LIKE '%${user_id}%'
        AND
        order_status LIKE '%${order_status}%'
    `;
    const count: any = (
      await sequelize.query(countListSQL, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false,
      })
    )[0];

    let handleOrderItemFn = async orderItem => {
      return await this.findRelationOrderItem(orderItem)
    }
    let queryAllPromise = () => {
      let arr = []
      orderList.forEach(orderItem => {
        arr.push(handleOrderItemFn(orderItem))
      })
      return new Promise((resolve, reject) => {
        Promise.all(arr).then(values => {
          resolve(values)
        })
      })
    }
    await queryAllPromise()

    return {
      code: 200,
      data: {
        list: orderList,
        total: count.total,
      },
    };
  }

  async findOne(id: number) {
    const queryListSQL = `
      SELECT
        id, order_no, user_id, order_status,
        DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime,
        DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') updateTime
      FROM
        shop_order
      WHERE
        id = '${id}'
    `;
    const orderList: any[] = await sequelize.query(queryListSQL, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false,
    });
    const orderResult = orderList[0]
    if (orderResult) {
      await this.findRelationOrderItem(orderResult)
      return {
        code: 200,
        data: orderResult,
      };
    } else {
      return {
        code: 400,
        msg: '查不到该订单'
      }
    }
  }

  async update(id: number, requestBody: any) {
    const { status } = requestBody;

    const updateSQL = `
      UPDATE
        shop_order
      SET
        order_status = ${status}
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
        shop_order
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
