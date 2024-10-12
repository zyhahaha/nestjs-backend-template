import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config/index';
// 业务模块
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './pages/user/user.module';
import { UserController } from './pages/user/user.controller';
import { AuthModule } from './pages/auth/auth.module';
import { FileModule } from './pages/file/file.module';
// import { TestMongodbModule } from './pages/test.mongodb/user.module';
// 邮箱服务
// import { MailerModule } from './pages/mailer/mailer.module';
// websocket
import { WsStartGateway } from './ws/ws.gateway'

@Module({
  imports: [
    // TestMongodbModule,
    UserModule,
    AuthModule,
    FileModule,
    // MailerModule,
    // MongooseModule.forRoot(config.db.mongodb.url)
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.db.mysql.host,
      port: config.db.mysql.port,
      username: config.db.mysql.user,
      password: config.db.mysql.password,
      database: config.db.mysql.database,
      timezone: '+08:00',
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, WsStartGateway],
})
export class AppModule {}
