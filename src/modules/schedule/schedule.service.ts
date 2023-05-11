import { Inject, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject('SCHEDULE_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    return this.client.emit('createSchedule', createScheduleDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
