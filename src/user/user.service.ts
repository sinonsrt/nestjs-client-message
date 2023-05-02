import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { CreateUserDto, UpdateUserDto } from './dto';
import env from '../config/env';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientKafka) {}

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
    if (password === confirmPassword) {
      password = await bcrypt.hash(password, 12);
    }

    const createUserMessage = {
      name,
      email,
      password,
      age,
      cep,
      number,
      phone,
    };

    this.client.emit(env.KAFKA_CREATE_USER_TOPIC, createUserMessage);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
