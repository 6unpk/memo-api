import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../dto/token.dto';
import { HttpError } from '../../common/http-error';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getUser(username);

    if (user.password !== password)
      throw new HttpError(400, 'INVALID_CREDENTIAL');

    return user;
  }

  async signIn(username: string, password: string): Promise<TokenDto> {
    const payload = {
      username,
      password,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
