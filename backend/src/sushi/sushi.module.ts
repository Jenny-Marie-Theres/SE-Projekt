import { Module } from '@nestjs/common';
import { SushiController } from './sushi.controller';
import { SushiService } from './sushi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sushi } from './sushi.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sushi]), AuthModule],
  controllers: [SushiController],
  providers: [SushiService],
  exports: [SushiService],
})
export class SushiModule {}
