import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import env from '../../config/env';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCHEDULE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${env.RMQ_USER}:${env.RMQ_PASSWORD}@${env.RMQ_URL}`],
          queue: env.RMQ_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
