import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { Username } from '../../auth/decorator/user';
import { MemoCommentRequest } from '../dto/memo-comment.request';
import { MemoComment } from '../entity/memo-comment.entity';
import { MemoCommentDto } from '../dto/memo-comment.dto';
import { MemoCommentService } from '../service/memo-comment.service';

@Controller('memos')
@ApiTags('MemoComments')
export class MemoCommentController {
  constructor(private readonly memoCommentService: MemoCommentService) {}

  static entityToDto(entity: MemoComment): MemoCommentDto {
    return {
      commenterId: entity.commenterId,
      comment: entity.comment,
      createdAt: entity.createdAt,
    };
  }

  @Post(':memoId/comments')
  @UseGuards(AuthGuard)
  async addComment(
    @Username() username: string,
    @Param('memoId') id: string,
    @Body() request: MemoCommentRequest,
  ): Promise<MemoCommentDto> {
    return MemoCommentController.entityToDto(
      await this.memoCommentService.createComment(
        username,
        id,
        request.comment,
      ),
    );
  }
}
