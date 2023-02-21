import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from "@nestjs/swagger";
import {
  HydratedDocument, Mixed, Schema as MongooseSchema
} from 'mongoose';
export type UniversityDocument = HydratedDocument<University>;
@Schema({ timestamps: true, autoCreate: false })
// @Schema({collection:"full_universities", timestamps: true,autoCreate:false })
export class University {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: MongooseSchema.Types.ObjectId;
  @ApiProperty()
  @Prop({ type: [String] })
  domains: string[];
  @ApiProperty()
  @Prop({ type: String, required: true })
  country: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  alpha_two_code: string;
  @ApiProperty()
  @Prop({ type: [String] })
  web_pages: string[];
  @ApiProperty()
  @Prop({ type: MongooseSchema.Types.Mixed })
  'state-province': Mixed;
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;
}
export const UniversitySchema = SchemaFactory.createForClass(University);
