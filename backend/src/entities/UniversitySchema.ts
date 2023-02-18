import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, Document, Schema as MongooseSchema, Mixed } from 'mongoose';
export type UniversityDocument = HydratedDocument<University>;
@Schema({timestamps: true,autoCreate:false })
// @Schema({collection:"full_universities", timestamps: true,autoCreate:false })
export class University  {
  // @Prop({ type: MongooseSchema.Types.ObjectId })
  //   _id: MongooseSchema.Types.ObjectId;
    @Prop({ type: [String] })
    domains: string;

    @Prop({ type: String,required:true })
    country: string;

    @Prop({ type: String,required:true })
    alpha_two_code: string;

    @Prop({ type: [String] })
    web_pages: string;

    @Prop({ type: MongooseSchema.Types.Mixed })
    'state-province': Mixed;

    @Prop({ type: String, required:true})
    name: string;

}
export const UniversitySchema = SchemaFactory.createForClass(University);