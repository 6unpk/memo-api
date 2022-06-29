import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthRequest extends Request {
  user: {
    username: {
      username: string;
    };
  };
}

export const Username = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.user.username.username;
  },
);
