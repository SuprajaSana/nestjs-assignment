import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team-dto';
import { TeamsService } from './teams.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly tasksService: TeamsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() dto: CreateTeamDto, @Req() request: Request) {
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
}
