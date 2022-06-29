import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class MemoComment {
  @Prop()
  commenterId: string;

  @Prop()
  comment: string;

  @Prop()
  createdAt: Date;

  @Prop()
  modifiedAt?: Date;
}
