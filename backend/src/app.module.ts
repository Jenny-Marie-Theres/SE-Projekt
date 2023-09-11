import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sushi } from './sushi/sushi.entity';
import { SushiModule } from './sushi/sushi.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { User } from './auth/user.entity';
import { Order } from './order/order.entity';
import { AuthModule } from './auth/auth.module';
import { Admin } from './auth/admin.entity';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'sushiApp',
      entities: [Sushi, User, Order, Admin],
      synchronize: true,
    }),
    SushiModule,
    UserModule,
    OrderModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}
