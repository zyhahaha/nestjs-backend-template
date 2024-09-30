import { Sequelize } from 'sequelize-typescript';
import dbConfig from 'src/config/db';

const sequelize = new Sequelize(
  dbConfig.mysql.database,
  dbConfig.mysql.user,
  dbConfig.mysql.password || null,
  {
    // 自定义主机; 默认值: localhost
    host: dbConfig.mysql.host, // 数据库地址
    // 自定义端口; 默认值: 3306
    port: dbConfig.mysql.port,
    dialect: 'mysql',
    logging: (sql, timing) => {  
      console.log(`Executed (${timing}ms): ${sql}`);  
    },
    pool: {
      max: dbConfig.mysql.connectionLimit, // 连接池中最大连接数量
      min: 0, // 连接池中最小连接数量
      acquire: 30000,
      idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    timezone: '+08:00', // 东八时区
  },
);

// 测试数据库链接
sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err: any) => {
    // 数据库连接失败时打印输出
    console.error(err);
    throw err;
  });

export default sequelize;
