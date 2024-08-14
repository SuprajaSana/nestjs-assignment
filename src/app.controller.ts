import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async signIn(@Res({ passthrough: true }) response: Response) {
    const jwt = await this.jwtService.signAsync({
      id: process.env.TOKEN_PAYLOAD,
    });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'Token created successfully',
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'LoggedOut Successfully',
    };
  }
}
