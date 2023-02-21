import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { Login_Type, SingUp_Type } from './config/types';
import { UsersService } from './users.service';
@Controller('user')
export class NoAuthController {
  constructor(public service: UsersService) { }
  @Post('/singup')
  @ApiBody({ type: SingUp_Type })
  async singup(@Body() data: any, @Res() res: Response) {
    try {
      const resp = await this.service.signUp(data);
      return res.status(HttpStatus.CREATED).json(resp);
    } catch (error) {
      throw new HttpException(
        { message: error.response.message, status: error.status },
        error.status,
      );
    }
  }
  @Post('/login')
  @ApiBody({ type: Login_Type })
  async login(@Body() data: any, @Res() res: Response) {
    try {
      const resp = await this.service.verifyLogin(data.email, data.password);
      return res.status(HttpStatus.OK).json(resp);
    } catch (error) {
      throw new HttpException(
        { message: error.response.message, status: error.status },
        error.status,
      );
    }
  }
}
