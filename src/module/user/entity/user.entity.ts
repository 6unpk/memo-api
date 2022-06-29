import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  refreshToken: string;

  @Prop()
  modifiedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
