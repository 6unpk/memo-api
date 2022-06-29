import { ApiProperty } from '@nestjs/swagger';
import { MemoCommentDto } from './memo-comment.dto';

export class MemoDto {
  @ApiProperty()
  id: string;
  username: string;
  title: string;
  note: string;
  comments: MemoCommentDto[];
}
