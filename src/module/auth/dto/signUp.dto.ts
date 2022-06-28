import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  username: string;
  password: string;
  name: string;
}
