import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from './jwt.strategy';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { UserAuthGuard } from './guard/user-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([Admin, User]),
  ],
  providers: [AuthService, JwtStrategy, AdminAuthGuard, UserAuthGuard],
  controllers: [AuthController],
  exports: [
    JwtStrategy,
    PassportModule,
    AdminAuthGuard,
    UserAuthGuard,
    JwtModule,
  ],
})
export class AuthModule {}
