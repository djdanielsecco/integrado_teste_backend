import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from './users.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(public service: UsersService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('x-authorization');
    try {
      const valid = await this.service
        .findById(authorization)
        .catch(() => false);
      if (valid) {
        next();
      } else {
        throw new Error('Access deneid');
      }
    } catch (error) {
      throw new HttpException(
        { message: error.message, status: HttpStatus.UNAUTHORIZED },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
