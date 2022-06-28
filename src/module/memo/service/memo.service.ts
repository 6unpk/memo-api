import { Injectable } from '@nestjs/common';
import { HttpError } from '../../common/http-error';
import { Memo, MemoDocument } from '../entity/memo.entity';
import { SortType } from '../../common/sort-type.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MemoService {
  constructor(
    @InjectModel(Memo.name)
    private readonly memoRepository: Model<MemoDocument>,
  ) {}

  async getMemo(memoId: string): Promise<Memo> {
    const findOne = await this.memoRepository.findOne({
      _id: memoId,
    });

    if (findOne === null) {
      throw new HttpError(404, 'NOT_FOUND_MEMO');
    }

    return findOne;
  }

  /**
   * @param page
   * @param limit
   * @param sort
   */
  async listMemo(
    page: number,
    limit: number,
    sort: SortType = SortType.ASC,
  ): Promise<Memo[]> {
    return this.memoRepository.find({}, '', {
      skip: page * limit,
      limit: page,
      sort: { createdDate: sort === SortType.ASC ? 1 : -1 },
    });
  }

  async createMemo(title: string, note: string): Promise<Memo> {
    const memo = await new this.memoRepository({
      _id: uuidv4(),
      title,
      note,
      createdAt: new Date(),
      modifiedAt: null,
      deletedAt: null,
    });
    return memo.save();
  }

  async updateMemo(memoId: string, title: string, note: string): Promise<Memo> {
    const findOne = await this.memoRepository.findByIdAndUpdate(
      {
        _id: memoId,
      },
      {
        title,
        note,
        modifiedAt: new Date(),
      },
      {
        lean: true,
      },
    );

    if (findOne == null) throw new HttpError(404, 'NOT_FOUND_MEMO');

    return findOne;
  }

  async deleteMemo(memoId: string): Promise<string> {
    await this.memoRepository.deleteOne({ _id: memoId });
    return memoId;
  }
}
