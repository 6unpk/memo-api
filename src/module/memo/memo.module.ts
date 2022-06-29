import { Module } from '@nestjs/common';
import { MemoController } from './controller/memo.controller';
import { Memo, MemoSchema } from './entity/memo.entity';
import { MemoService } from './service/memo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemoCommentService } from './service/memo-comment.service';
import { MemoCommentController } from './controller/memo-comment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Memo.name, schema: MemoSchema }]),
  ],
  controllers: [MemoController, MemoCommentController],
  providers: [MemoService, MemoCommentService],
})
export class MemoModule {}
