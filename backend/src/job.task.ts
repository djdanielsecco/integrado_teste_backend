import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { country } from './config/constants';
import {
  University,
  UniversityDocument,
  UniversitySchema,
} from './entities/UniversitySchema';
@Injectable()
export class JobService {
  constructor(
    public httpService: HttpService,
    @InjectModel(University.name)
    public universityModel: Model<UniversityDocument>,
  ) { }
  resolver = (cb: any, delay: any) =>
    new Promise((resolve) => setTimeout(() => resolve(cb), delay));
  start = async function () {
    try {
      for await (const i of country) {
        function unique(arr: any[]) {
          return arr?.filter(
            (
              (set) => (f: any) =>
                !(!set.has(f?.["state-province"]) && set.add(f?.["state-province"])) && (!set.has(f?.name) && set.add(f?.name))
            )(new Set())
          );
        }
        const url = `http://universities.hipolabs.com/search?country=${i}`;
        await this.resolver(this.httpService.axiosRef.get(url), 1000).then(
          async (res: AxiosResponse) => {
            const parse: Array<any> = (await res?.data) ?? [];
            const COLLECTION = this.universityModel.db.model(
              `${i}`,
              UniversitySchema,
              `${i}`,
            );
            const exist = await COLLECTION.exists();
            if (!exist) {
              await COLLECTION.createCollection();
              parse.length > 0 && await COLLECTION.insertMany(unique(parse))
            } else {
              if (((await COLLECTION.countDocuments()) != parse.length) && parse.length > 0) {
                for await (const x of unique(parse)) {
                  await COLLECTION.findOneAndUpdate({ name: x.name, country: x.country, "state-province": x?.["state-province"] ?? null }, {
                    $set: {
                      name: x?.name,
                      country: x?.country,
                      "state-province": x?.["state-province"] ?? null,
                      alpha_two_code: x?.alpha_two_code,
                      web_pages: x?.web_pages,
                      domains: x?.domains
                    }
                  }, {
                    upsert: true,
                    strict: false,
                  });
                }
              }
            }
          },
        );
      }
    } catch (error) {
    }
  };
  // executa a atualizacao todo dias as 23 horas
  @Cron('0 59 23 * * *', {
    name: 'Get Universities',
    timeZone: 'America/Sao_Paulo',
  })
  async handleCron() {
    await this.start();
  }
}
