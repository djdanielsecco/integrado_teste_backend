import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from 'mongoose';
export type UsersDocument = HydratedDocument<Users>;
@Schema({ collection: 'users', timestamps: true })
export class Users {
  @ApiProperty()
  @Prop({ type: String })
  name: string;
  @ApiProperty()
  @Prop({ type: String })
  password: string;
  @ApiProperty()
  @Prop({ type: String, unique: true })
  email: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
