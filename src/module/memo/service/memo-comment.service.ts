import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Memo, MemoDocument } from '../entity/memo.entity';
import { Model } from 'mongoose';
import { MemoComment } from '../entity/memo-comment.entity';
import { MemoService } from './memo.service';

@Injectable()
export class MemoCommentService {
  constructor(
    @InjectModel(Memo.name)
    private readonly memoRepository: Model<MemoDocument>,
    private readonly memoService: MemoService,
  ) {}

  async createComment(
    commenterId: string,
    memoId: string,
    comment: string,
  ): Promise<MemoComment> {
    const memo = await this.memoService.getMemo(memoId);

    const newComment: MemoComment = {
      commenterId,
      comment,
      createdAt: new Date(),
    };

    await this.memoRepository.findByIdAndUpdate(
      {
        _id: memoId,
      },
      {
        comments: [...memo.comments, newComment],
      },
      {
        new: true,
      },
    );

    return newComment;
  }
}
