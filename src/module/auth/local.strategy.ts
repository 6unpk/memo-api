import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { HttpError } from '../common/http-error';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      userNameField: 'username',
    });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) throw new HttpError(400, 'INVALID_CREDENTIALS');

    return user;
  }
}
