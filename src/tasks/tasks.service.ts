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
     var dt = new Date().toISOString();
     var dtarr = dt.split('T');
     if (dto.due_date > dtarr[0]) {
       const task = this.taskRepository.create(dto);
       return await this.taskRepository.save(task);
     } else {
        return { message: 'Please enter valid date' };
     }
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
      var dt = new Date().toISOString();
      var dtarr = dt.split('T');
      if (task.due_date > dtarr[0]) {
        task.description = dto.description;
        task.due_date = dto.due_date;
        task.assignee = dto.assignee;
        task.status = dto.status;
        return await this.taskRepository.save(task);
      } else {
        return { message: 'Please enter vaild date' };
      }
    }
  }
}
