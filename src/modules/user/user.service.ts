import * as bcrypt from 'bcrypt';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { User } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { InvalidParamError } from 'src/shared/uitls/errors';
import { AppError } from 'src/shared/uitls/errors/app-error';
import { UserRepository } from './user.repository';
import env from '../../config/env';

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
    {
      age,
      cep,
      email,
      name,
      number,
      phone,
      confirmPassword,
      password,
    }: UpdateUserDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found!', HttpStatus.NOT_FOUND);
    }

    if (password !== confirmPassword) {
      throw new InvalidParamError(confirmPassword);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    Object.assign(user, {
      age,
      cep,
      email,
      name,
      number,
      phone,
      password: hashedPassword,
    });

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
