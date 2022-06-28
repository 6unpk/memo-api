import { ApiProperty } from '@nestjs/swagger';

export class MemoRequest {
  @ApiProperty()
  title: string;
  note: string;
}
