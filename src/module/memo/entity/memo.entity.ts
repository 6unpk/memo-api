import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MemoComment } from './memo-comment.entity';

export type MemoDocument = Memo & Document;

@Schema()
export class Memo {
  @Prop()
  _id: string;

  @Prop()
  authorId: string;

  @Prop()
  title: string;

  @Prop()
  note: string;

  @Prop()
  comments: MemoComment[];

  @Prop()
  createdAt: Date;

  @Prop()
  modifiedAt?: Date;
}

export const MemoSchema = SchemaFactory.createForClass(Memo);
