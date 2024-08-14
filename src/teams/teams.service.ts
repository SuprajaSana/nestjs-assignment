import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dtos/create-team-dto';
import { Team } from './team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  async create(dto: CreateTeamDto) {
    const task = this.teamRepository.create(dto);

    return await this.teamRepository.save(task);
  }

  findAll() {
    return this.teamRepository.find();
  }
}
