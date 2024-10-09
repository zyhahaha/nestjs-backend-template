import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from 'src/config/db';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './pages/user/user.module';
import { UserController } from './pages/user/user.controller';
import { AuthModule } from './pages/auth/auth.module';
// import { TestMongodbModule } from './pages/test.mongodb/user.module';
import { FileModule } from './pages/file/file.module';
// import { MailerModule } from './pages/mailer/mailer.module';

// import { WsStartGateway } from './ws/ws.gateway'

@Module({
  imports: [
    // TestMongodbModule,
    UserModule,
    AuthModule,
    FileModule,
    // MailerModule,
    // MongooseModule.forRoot(dbConfig.mongodb.url)
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbConfig.mysql.host,
      port: dbConfig.mysql.port,
      username: dbConfig.mysql.user,
      password: dbConfig.mysql.password,
      database: dbConfig.mysql.database,
      timezone: '+08:00',
      // entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
