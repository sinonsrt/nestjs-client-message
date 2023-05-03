import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
}
