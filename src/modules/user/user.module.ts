import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserRepository } from './user.repository';
import env from '../../config/env';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: env.KAFKA_CLIENT_ID,
            brokers: [env.KAFKA_BROKER_URL],
          },
          consumer: {
            groupId: env.KAFKA_CONSUMER_GROUP_ID,
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {}
