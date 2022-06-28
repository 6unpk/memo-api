import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './datasource/database.module';
import { MemoModule } from './module/memo/memo.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    MemoModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
