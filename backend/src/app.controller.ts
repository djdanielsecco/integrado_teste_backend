import {  Body, Controller, Get, HttpStatus, Post, Query, Res ,Delete,Put, HttpException, Param } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UsersService } from './users.service';
import { Response } from 'express';
import { University } from './entities/UniversitySchema';
@Controller("api")
export class AppController {
  constructor(private readonly appService: UniversityService,private readonly userService: UsersService) {}
  @Put('/change_password')
  async login(@Body() data: any, @Res() res: Response) {
  
      try {
          const resp = await this.userService.changePassword(data.email, data.password, data.new_password)
          return res.status(HttpStatus.ACCEPTED).json(resp);
      } catch (error) {
          throw new HttpException({ msg: error.message, status: HttpStatus.NOT_MODIFIED }, HttpStatus.NOT_MODIFIED);
      }
  }
  @Get("/univercities/:id")
  async getById(@Param('id') id: string,@Res() res: Response) {
    console.log('id1: ', id);
try {

  const resp = await this.appService.getById(id);

return res.status(HttpStatus.ACCEPTED).json(resp);
} catch (error) {
  throw new HttpException({ msg: error.message, status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
}
  }
  @Get("/univercities")
  async listUni(@Query() query: Object,@Res() res: Response) {
try {

  const resp = await this.appService.list(query);

return res.status(HttpStatus.ACCEPTED).json(resp);
} catch (error) {
  throw new HttpException({ msg: error.message, status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
}
  }
  @Post('/univercities')
  async create(@Body() data: University, @Res() res: Response) {

 
      try {
          const resp = await this.appService.create(data)
          return res.status(HttpStatus.ACCEPTED).json(resp);
      } catch (error) {
       
          throw new HttpException({ msg: error.response.msg, status: error.status}, error.status);
      }
  }

}
