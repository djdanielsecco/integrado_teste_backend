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
@Controller('user')
export class NoAuthController {
  constructor(public service: UsersService) {}
  @Post('/singup')
  async singup(@Body() data: any, @Res() res: Response) {
    console.log('data: ', data);
    try {
      const resp = await this.service.signUp(data);
      return res.status(HttpStatus.CREATED).json(resp);
    } catch (error) {
      throw new HttpException(
        { msg: error.message, status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Post('/login')
  async login(@Body() data: any, @Res() res: Response) {
    console.log('data: ', data);
    try {
      const resp = await this.service.verifyLogin(data.email, data.password);
      return res.status(HttpStatus.OK).json(resp);
    } catch (error) {
      throw new HttpException(
        { msg: error.message, status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
