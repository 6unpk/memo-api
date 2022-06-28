import { ApiProperty } from '@nestjs/swagger';

export class MemoDto {
  @ApiProperty()
  id: string;
  title: string;
  note: string;
}
