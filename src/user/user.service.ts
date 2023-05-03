import * as bcrypt from 'bcrypt';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { CreateUserDto, UpdateUserDto } from './dto';
import { InvalidParamError } from 'src/utils/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppError } from 'src/utils/errors/app-error';
import env from '../config/env';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientKafka,
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  async create({
    name,
    email,
    password,
    confirmPassword,
    age,
    cep,
    number,
    phone,
  }: CreateUserDto): Promise<void> {
    if (password !== confirmPassword) {
      throw new InvalidParamError(confirmPassword);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createUserMessage = {
      name,
      email,
      password: hashedPassword,
      age,
      cep,
      number,
      phone,
    };

    this.client.emit(env.KAFKA_CREATE_USER_TOPIC, createUserMessage);
  }

  async update(
    id: number,
    { age, cep, email, name, number, phone }: UpdateUserDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found!', HttpStatus.NOT_FOUND);
    }

    Object.assign(user, { age, cep, email, name, number, phone });

    this.client.emit(env.KAFKA_UPDATE_USER_TOPIC, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
