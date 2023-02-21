
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { country } from './config/constants';
import {
  University,
  UniversityDocument,
  UniversitySchema,
} from './entities/UniversitySchema'; 
import { ObjectId } from 'mongodb'
@Injectable()
export class UniversityService {
  /**
   *
   */
  constructor(
    @InjectModel(University.name)
    public universityModel: Model<UniversityDocument>,
  ) { }
  async list(query: { country: string; page: number }) {
    try {
      if (!query?.page) {
        throw new Error('Missing page param');
      }
      const limit = 20;
      const isCountry = country?.includes(query?.country);
      const firstCollection = isCountry ? query?.country : country.at(0);
      const COLLECTION = this.universityModel.db.model(
        "ListModel",
        UniversitySchema,
        firstCollection,
      );
      if (isCountry) {
        const Total = await COLLECTION.countDocuments();
        const queryCountry = query?.country;
        const expression = new RegExp(queryCountry, 'i');
        const documents = await COLLECTION.find(
          { country: { $regex: expression } },
          '_id name country state-province',
        )
          .limit(limit)
          .skip(limit * (+query?.page - 1));
        if (+documents?.length == 0) { throw new Error('Not found'); }
        return {
          data: { Total, pages: Math.ceil(Total / limit), page: +query?.page },
          documents,
        };
      } else {
        const toAggregate = country.filter((i) => i !== firstCollection);
        const unions = toAggregate.map((e) => ({ $unionWith: `${e}` }));
        const fullDocuments = await COLLECTION.aggregate([
          ...unions,
          { $skip: limit * (+query?.page - 1) },
          { $limit: limit },
          { $project: { _id: 1, name: 1, country: 1, 'state-province': 1 } },
        ]);
        const data = await COLLECTION.aggregate([
          ...unions,
          { $count: 'Total' },
        ]);
        if (+fullDocuments?.length == 0) { throw new Error('Not found'); }
        return {
          data: {
            ...data?.at(0),
            pages: Math.ceil(data?.at(0).Total / limit),
            page: +query?.page,
          },
          documents: fullDocuments,
        };
      }
    } catch (error) {
      throw new HttpException(
        { message: error.message, status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async getById(id: string): Promise<University> {
    try {
      const firstCollection = country.at(0);
      const COLLECTION = this.universityModel.db.model(
        "GetModel",
        UniversitySchema,
        firstCollection,
      );
      const toAggregate = country.filter((i) => i !== firstCollection);
      const unions = toAggregate.map((e) => ({ $unionWith: `${e}` }));
      const document: Array<University> = await COLLECTION.aggregate([
        ...unions,
        // { $project: { _id: 1, name: 1, country: 1, 'state-province': 1 } },
        { $project: { "__v": 0 } },
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
      ]);
      console.log('document: ', document);
    if( !!document?.at(0)){
      return  document.at(0)
    }else{
      throw new Error(`Not found document _id:${id}`);
      
    }
      
    } catch (error) {

      throw new HttpException(
        { message: error.message, status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async create(university: University) {
    try {
      if (university.alpha_two_code.length != 2) {
        throw new Error('alpha_two_code needs 2 characters');
      }
      const newEntrie = {
        ...university,
        country:university.country.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
        'state-province': university?.['state-province'] ?? null,
        alpha_two_code: university.alpha_two_code.toUpperCase(),
      };
      const firstCollection = newEntrie?.country?.toLowerCase();
      const COLLECTION = this.universityModel.db.model(
        'CreateModel',
        UniversitySchema,
        firstCollection,
      );
      const expression = new RegExp(newEntrie?.country, 'i');
      const check = await COLLECTION.find({
        name: newEntrie.name,
        country: { $regex: expression },
        'state-province': university?.['state-province'],
        alpha_two_code: newEntrie.alpha_two_code,
      })
        .then((d) => {
          if (+d?.length === 0) {
            return false;
          } else {
            return true;
          }
        })
        .catch(() => false);
      if (!check) {
        await COLLECTION.insertMany(newEntrie);
        return { message: 'New documment created' };
      } else {
        throw new Error('Documment exists');
      }
    } catch (error) {
      throw new HttpException(
        { message: error.message, status: HttpStatus.AMBIGUOUS },
        HttpStatus.AMBIGUOUS,
      );
    }
  }
  async update(id: string, params: { name: string, web_pages: string[], domais: string[] }) {
    try {
      const doc = await this.getById(id)
      try {
        const o_Id = new ObjectId(id)
        const collection = doc.country.toLowerCase()
        const COLLECTION = this.universityModel.db.model(
          'UpdateModel',
          UniversitySchema,
          collection,
        );
       await COLLECTION.updateOne({_id:o_Id},{...params})
      } catch (e) {
        throw new Error(e.message);
      }
      return { message: "document updated" }
    } catch (error) {
      throw new HttpException(
        { message:error.message, status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async delete(id: string) {
    try {
      const doc = await this.getById(id)
      await this.universityModel.db.collection(doc.country.toLowerCase()).deleteOne(doc)
      return { message: "document deleted" }
    } catch (error) {
      throw new HttpException(
        { message: "Not Found", status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
