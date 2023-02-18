import { Injectable, Logger } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { University, UniversityDocument, UniversitySchema } from './entities/UniversitySchema';
import { country } from './config/constants';
@Injectable()
export class AppService {
  constructor(
    public httpService: HttpService,
    @InjectModel(University.name)
    public universityModel: Model<UniversityDocument>,
  ) {}


}
