import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument } from 'mongoose';
export type UsersDocument = HydratedDocument<Users>;
@Schema({collection:"users", timestamps: true })
export class Users  {

    @Prop({ type: String })
    name: string;

  

    @Prop({ type: String })
    password: string;

    @Prop({ type: String,unique:true })
    email: string;

  

}
export const UsersSchema = SchemaFactory.createForClass(Users);