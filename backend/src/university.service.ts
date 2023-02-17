/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { University, UniversityDocument, UniversitySchema } from './entities/UniversitySchema';
@Injectable()
export class UniversityService {
    /**
     *
     */
    constructor(
        @InjectModel(University.name)
        public universityModel: Model<UniversityDocument>,
    ) { }
    async list(query:any) {
        try {
          
            // const COLLECTION = this.universityModel.db.model('univercitiesdata', UniversitySchema, "univercitiesdata");
            let total = await this.universityModel.countDocuments()
            let documents = await this.universityModel.find({}).limit(20).skip(+query?.page -1)
            console.log(total,'documents: ', documents);
            return {total,documents}
        } catch  {
            throw new Error("Not permited");
        }
   
   
    
    }
}
