import { ApiProperty } from '@nestjs/swagger';

export class MemoDto {
  @ApiProperty()
  id: string;
  username: string;
  title: string;
  note: string;
}
