import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task-dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto) {
    const task = this.taskRepository.create(dto);

    return await this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find();
  }

  findMany(assignee: string) {
    return this.taskRepository.find({ where: { assignee } });
  }

  async update(id: number, dto: CreateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (task) {
      task.description = dto.description;
      task.due_date = dto.due_date;
      task.assignee = dto.assignee;
      task.status = dto.status;
      return await this.taskRepository.save(task);
    }
  }
}
