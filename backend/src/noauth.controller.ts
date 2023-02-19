/*
https://docs.nestjs.com/controllers#controllers
*/
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ApiBody } from '@nestjs/swagger';
import {Login_Type, SingUp_Type} from'./config/types'
@Controller('user')
export class NoAuthController {
  constructor(public service: UsersService) {}
  @Post('/singup')
  @ApiBody({ type: SingUp_Type })
  async singup(@Body() data: any, @Res() res: Response) {
    console.log('data: ', data);
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
    console.log('data: ', data);
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
