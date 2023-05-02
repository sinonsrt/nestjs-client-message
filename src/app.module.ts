import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [UserModule, CartModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
