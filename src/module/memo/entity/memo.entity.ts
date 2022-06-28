import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemoDocument = Memo & Document;

@Schema()
export class Memo {
  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop()
  note: string;

  @Prop()
  comments: string;

  @Prop()
  createdAt: Date;

  @Prop()
  modifiedAt?: Date;
}

export const MemoSchema = SchemaFactory.createForClass(Memo);
