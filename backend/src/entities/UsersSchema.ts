import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
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
