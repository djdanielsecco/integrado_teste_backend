import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(public service: UsersService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('req: ', req);
try {
  let valid = await this.service.findById(req?.body?.ID || req?.query?.ID)
  if (valid) { next() } else {
    throw new Error("Not permission");
  }
} catch (error) {
  throw new HttpException({ msg: error.message, status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
}
  

  }
}
