import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { SushiModule } from "../sushi/sushi.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  SushiModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
