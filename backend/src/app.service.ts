
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  University,
  UniversityDocument
} from './entities/UniversitySchema';
import { Users, UsersDocument } from './entities/UsersSchema';
@Injectable()
export class AppService {
  constructor(
  
    @InjectModel(University.name)
    public universityModel: Model<UniversityDocument>,
    @InjectModel(Users.name)
    public userModel: Model<UsersDocument>,
  ) {}
}
