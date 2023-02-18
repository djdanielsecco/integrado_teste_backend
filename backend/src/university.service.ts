/*
https://docs.nestjs.com/providers#services
*/
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { country } from './config/constants';
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
    async list(query: any) {
        try {
            if (!query?.page) {
                throw new Error("Missing page param");
            }
            const limit = 20
            const isCountry = country?.includes(query?.country)
            const firstCollection = isCountry ? query?.country : country[0]
            const COLLECTION = this.universityModel.db.model(firstCollection, UniversitySchema, firstCollection);
            if (isCountry) {
                const Total = await COLLECTION.countDocuments()
                let queryCountry = query?.country
                console.log('queryCountry: ', queryCountry);
                let expression = new RegExp(queryCountry, "i")
                const documents = await COLLECTION.find({ country: { $regex: expression } }, "_id name country state-province").limit(limit).skip(limit * (+query?.page - 1))
                return { data: { Total, pages: Math.ceil(Total / limit), page: +query?.page }, documents }
            } else {
                let toAggregate = country.filter(i => (i !== firstCollection))
                let unions = toAggregate.map(e => ({ "$unionWith": `${e}` }))
                let fullDocuments = await COLLECTION.aggregate([
                    ...unions,
                    { $skip: limit * (+query?.page - 1) },
                    { $limit: limit },
                    { $project: { _id: 1, name: 1, country: 1, "state-province": 1 } }
                ])
                let data = await COLLECTION.aggregate([
                    ...unions,
                    { "$count": "Total" },
                ])
                return { data: { ...data?.[0], pages: Math.ceil(data?.[0].Total / limit), page: +query?.page }, documents: fullDocuments }
            }
        } catch {
            throw new Error("Not permited");
        }
    }
    async getById(id: string) {
        console.log('id2: ', id);
        try {
            const firstCollection = country[0]
            const COLLECTION = this.universityModel.db.model(firstCollection, UniversitySchema, firstCollection);
            let toAggregate = country.filter(i => (i !== firstCollection))
            let unions = toAggregate.map(e => ({ "$unionWith": `${e}` }))
            let document = await COLLECTION.aggregate([
                ...unions,
                { $project: { _id: 1, name: 1, country: 1, "state-province": 1 } },
                { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
            ])
            return { document }
        } catch (error) {
            throw new Error("Not find");
        }
    }
    async create(university: University) {
        try {
            if (university.alpha_two_code.length != 2) { throw new Error("alpha_two_code needs 2 characters"); }
            const newEntrie = {
                ...university,
                "state-province": university?.["state-province"] ?? null,
                alpha_two_code: university.alpha_two_code.toUpperCase()
            }
            const firstCollection = newEntrie?.country?.toLowerCase()
            console.log('firstCollection: ', firstCollection);
            const COLLECTION = this.universityModel.db.model(firstCollection, UniversitySchema, firstCollection);
            let expression = new RegExp(newEntrie?.country, "i")
            const check = await COLLECTION.find({ name: newEntrie.name, country: { $regex: expression }, "state-province": university?.["state-province"], alpha_two_code: newEntrie.alpha_two_code }).then((d) => {
                if (+d?.length === 0) { return false } else {
                    return true
                }
            }).catch(() => false)
            console.log('check: ', check);
            if (!check) {
                await COLLECTION.insertMany(newEntrie)
                return { message: "New documment created"}
            } else {
                throw new Error("Documment exists");
            }
        } catch (error) {
            throw new HttpException({ msg: error.message, status: HttpStatus.AMBIGUOUS }, HttpStatus.AMBIGUOUS);
        }
    }
}
