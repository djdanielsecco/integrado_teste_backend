import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res ,Delete,Put, HttpException } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UsersService } from './users.service';
import { Response } from 'express';
@Controller("api")
export class AppController {
  constructor(private readonly appService: UniversityService,private readonly userService: UsersService) {}
  @Put('/change_password')
  async login(@Body() data: any, @Res() res: Response) {
      console.log('data: ', data);
      try {
          const resp = await this.userService.changePassword(data.email, data.password, data.new_password)
          return res.status(HttpStatus.OK).json(resp);
      } catch (error) {
          throw new HttpException({ msg: error.message, status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
      }
  }
  @Get("/univercities")
  async listU(@Query() query: any,@Res() res: Response) {
try {
  console.log('query: ', query);
  const resp = await this.appService.list(query);
  console.log('resp: ', resp);
return res.status(HttpStatus.OK).json(resp);
} catch (error) {
  throw new HttpException({ msg: error.message, status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
}
  }
}
