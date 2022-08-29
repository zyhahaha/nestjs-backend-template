import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './pages/user/user.module';
import { UserController } from './pages/user/user.controller';
import { AuthModule } from './pages/auth/auth.module';
// import { TestUserModule } from './pages/test.user/user.module';
import { FileModule } from './pages/file/file.module';
import { MailerModule } from './pages/mailer/mailer.module';

import { WsStartGateway } from './ws/ws.gateway'

import dbConfig from 'src/config/db';

@Module({
  imports: [
    // TestUserModule,
    UserModule,
    AuthModule,
    FileModule,
    MailerModule,
    MongooseModule.forRoot(dbConfig.mongodb.url)
  ],
  controllers: [AppController, UserController],
  providers: [AppService, WsStartGateway],
})
export class AppModule {}
