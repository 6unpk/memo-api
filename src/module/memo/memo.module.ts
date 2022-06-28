import { Module } from '@nestjs/common';
import { MemoController } from './controller/memo.controller';
import { Memo, MemoSchema } from './entity/memo.entity';
import { MemoService } from './service/memo.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Memo.name, schema: MemoSchema }]),
  ],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
