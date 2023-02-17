import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, Document, Schema as MongooseSchema } from 'mongoose';
export type UniversityDocument = HydratedDocument<University>;
@Schema({collection:"full_universities", timestamps: true,autoCreate:false })
export class University  {
  @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: MongooseSchema.Types.ObjectId;
    @Prop({ type: Object })
    domains: object;

    @Prop({ type: String })
    country: string;

    @Prop({ type: String })
    alpha_two_code: string;

    @Prop({ type: Object })
    web_pages: object;

    @Prop({ type: String })
    'state-province': string;

    @Prop({ type: String})
    name: string;

}
export const UniversitySchema = SchemaFactory.createForClass(University);