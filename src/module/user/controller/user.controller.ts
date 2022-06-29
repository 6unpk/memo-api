import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  static entityToDto(entity: User): UserDto {
    return {
      id: entity._id,
      name: entity.name,
    };
  }

  /**
   *
   */
  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUser(@Param('userId') id: string): Promise<UserDto> {
    return UserController.entityToDto(await this.userService.getUser(id));
  }

  @Delete(':userId')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('userId') id: string): Promise<string> {
    await this.userService.deleteUser(id);
    return id;
  }
}
