import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  Delete,
  Put,
  HttpException,
  Param,
  Type,
} from '@nestjs/common';
import { UniversityService } from './university.service';
import { UsersService } from './users.service';
import { Response } from 'express';
import { University, UniversitySchema,UniversityDocument } from './entities/UniversitySchema';
import { ApiParam,ApiBody,ApiQuery, getSchemaPath,ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
// export type RootState = ReturnType<typeof UniversityService.list>;
import { ChangePass_Type, Create_Type, SearchQuery_Type, Update_Type} from'./config/types'
@ApiHeader({
  name: 'X-Authorization',
  description: 'Client _id for auth routes',
  
})
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: UniversityService,
    private readonly userService: UsersService,

  ) {}

  @Put('/change_password')
  @ApiBody({ type: ChangePass_Type })
  async changePwd(
    @Body() data: { email: string; password: string; new_password: string },
    @Res() res: Response,
  ) {
    try {
      const resp = await this.userService.changePassword(
        data.email,
        data.password,
        data.new_password,
      );
      return res.status(HttpStatus.ACCEPTED).json(resp);
    } catch (error) {
      throw new HttpException(
        { message: error.response.message, status: error.status },
        error.status,
      );
    }
  }
  @Get('/univercities/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'either an integer for the project id or a string for the project name', 
    schema: { oneOf: [{type: 'string'}]},
    type: 'string' 
  })
  async getById(@Param('id') id: string, @Res() res: Response) {
    console.log('id1: ', id);
    try {
      const resp = await this.appService.getById(id);
      return res.status(HttpStatus.ACCEPTED).json(resp);
    } catch (error) {
      throw new HttpException(
        { message: error.response.message, status: error.status },
        error.status,
      );
    }
  }
  @Get('/univercities')
  @ApiQuery({ type: SearchQuery_Type })
  async search(
    @Query() query: { page: number; country: string },
    @Res() res: Response,
  ) {
    try {
      const resp = await this.appService.list(query);
      return res.status(HttpStatus.ACCEPTED).json(resp);
    } catch (error) {
      throw new HttpException(
        { message: error.response.message, status: error.status },
        error.status,
      );
    }
  }
  @Post('/univercities')
  @ApiBody({ type: Create_Type })
  async create(@Body() data: University, @Res() res: Response) {
    try {
      const resp = await this.appService.create(data);
      return res.status(HttpStatus.ACCEPTED).json(resp);
    } catch (error) {
      throw new HttpException(
        { message: error.response.message, status: error.status },
        error.status,
      );
    }
  }
  @Put('/univercities/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'either an integer for the project id or a string for the project name', 
    schema: { oneOf: [{type: 'string'}]},
    type: 'string' 
  })
  @ApiBody({ type: Update_Type })
  async update(@Param('id') id: string,@Body() param: {name:string,web_pages:Array<string>,domais:Array<string>}, @Res() res: Response) {
    console.log('id1: ', id);
    try {
      const resp = await this.appService.update(id, param);
      return res.status(HttpStatus.ACCEPTED).json(resp);
    } catch (error) {
      throw new HttpException(
        { message: error.response.message, status: error.status },
        error.status,
      );
    }
  }
  @Delete('/univercities/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Delete document', 
    schema: { oneOf: [{type: 'string'}]},
    type: 'string' 
  })
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const resp = await this.appService.delete(id);
      return res.status(HttpStatus.OK).json(resp);
    } catch (error) {
      throw new HttpException(
        { message: error.response.message, status: error.status },
        error.status,
      );
    }
  }
}
