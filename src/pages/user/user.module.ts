import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserController } from './user.controller';
import { UserEntity } from './user.entity';

@Module({
  // controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
})
export class UserModule {}
