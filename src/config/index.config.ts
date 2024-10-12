const localConfig = {
  elasticsearch: {
    url: 'http://localhost:9222',
    auth: {
      username: '用户名',
      password: '密码'
    }
  },
  db: {
    mysql: {
      port: 3306,
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'e-shop', // 库名
      connectionLimit: 10, // 连接限制
    },
    // mongodb暂无应用场景，下面连接配置已失效
    mongodb: {
      url: 'mongodb://zyhahaha:123456@localhost:27017/nest?authSource=test'
    },
    // redis用于账号登录，session
    redis: {
      port: 6379,
      host: 'localhost',
      db: 'nest',
      password: '123456'
    }
  }
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
// const config = process.env.NODE_ENV ? productConfig : localConfig;

export default localConfig