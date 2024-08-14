import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task-dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() dto: CreateTaskDto, @Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie, {
        secret: process.env.SECRET_TOKEN,
      });

      if (!data) {
        throw new UnauthorizedException();
      }
      return this.tasksService.create(dto);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get(':assignee')
  async findMany(@Param('assignee') assignee: string, @Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie, {
        secret: process.env.SECRET_TOKEN
      });

      if (!data) {
        throw new UnauthorizedException();
      }
      return this.tasksService.findMany(assignee);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get()
  async findAll(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie, {
        secret: process.env.SECRET_TOKEN,
      });

      if (!data) {
        throw new UnauthorizedException();
      }

      return this.tasksService.findAll();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateTaskDto,
    @Req() request: Request,
  ) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie, {
        secret: process.env.SECRET_TOKEN,
      });

      if (!data) {
        throw new UnauthorizedException();
      }

      return this.tasksService.update(id, dto);
    } catch (e) {
        throw new UnauthorizedException();
    }
  }
}
