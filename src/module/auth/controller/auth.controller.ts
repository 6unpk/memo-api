import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/signIn.dto';
import { TokenDto } from '../dto/token.dto';
import { UserService } from '../../user/service/user.service';
import { UserDto } from '../../user/dto/user.dto';
import { SignUpDto } from '../dto/signUp.dto';
import { UserController } from '../../user/controller/user.controller';
import { LocalAuthGuard } from '../local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  @ApiCreatedResponse({ type: TokenDto })
  async signIn(@Body() request: SignInDto): Promise<TokenDto> {
    return this.authService.signIn(request.username, request.password);
  }

  @Post('signUp')
  async signUp(@Body() request: SignUpDto): Promise<UserDto> {
    return UserController.entityToDto(
      await this.userService.createUser(
        request.username,
        request.password,
        request.name,
      ),
    );
  }
}
