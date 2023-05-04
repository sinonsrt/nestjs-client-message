import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { ScheduleModule } from './modules/schedule/schedule.module';

@Module({
  imports: [UserModule, CartModule, ScheduleModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
