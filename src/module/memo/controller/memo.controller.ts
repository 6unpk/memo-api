import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MemoDto } from '../dto/memo.dto';
import { MemoRequest } from '../dto/memo.request';
import { Memo } from '../entity/memo.entity';
import { MemoService } from '../service/memo.service';
import { SortType } from '../../common/sort-type.enum';
import { Pageable } from '../../common/pageable';
import { PageableResponse } from '../../common/pageable.response';
import { AuthGuard } from '../../auth/auth.guard';
import { Username } from '../../auth/decorator/user';

@Controller('memos')
@ApiTags('Memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  private static entityToDto(entity: Memo): MemoDto {
    return {
      id: entity._id,
      username: entity.authorId,
      title: entity.title,
      note: entity.note,
    };
  }

  @Get()
  async getMemoList(
    @Query() pageable: Pageable,
  ): Promise<PageableResponse<MemoDto>> {
    const result = await this.memoService.listMemo(
      pageable.count ?? 0,
      pageable.page ?? 0,
      pageable.sort ?? SortType.ASC,
    );

    return new PageableResponse(
      result.map((e) => MemoController.entityToDto(e)),
      result.length,
      pageable.page ?? 0,
      pageable.count ?? 0,
    );
  }

  @Get(':memoId')
  async getMemo(@Param('memoId') id: string): Promise<MemoDto> {
    return MemoController.entityToDto(await this.memoService.getMemo(id));
  }

  /**
   *
   * @param username
   * @param id
   * @param request
   */
  @Put(':memoId')
  @UseGuards(AuthGuard)
  async updateMemo(
    @Username() username: string,
    @Param('memoId') id: string,
    @Body() request: MemoRequest,
  ): Promise<MemoDto> {
    return MemoController.entityToDto(
      await this.memoService.updateMemo(
        username,
        id,
        request.title,
        request.note,
      ),
    );
  }

  /**
   *
   * @param username
   * @param request
   */
  @Post()
  @UseGuards(AuthGuard)
  async addMemoList(
    @Username() username: string,
    @Body() request: MemoRequest,
  ): Promise<MemoDto> {
    return MemoController.entityToDto(
      await this.memoService.createMemo(username, request.note, request.title),
    );
  }

  @Delete(':memoId')
  @UseGuards(AuthGuard)
  async deleteMemo(
    @Username() username: string,
    @Param('memoId') id: string,
  ): Promise<string> {
    await this.memoService.deleteMemo(username, id);
    return id;
  }
}
