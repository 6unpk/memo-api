import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const option = {
          host: configService.get<string>('MONGO_HOST'),
          port: parseInt(
            configService.get<string>('MONGO_PORT') ?? '27017',
            10,
          ),
          username: configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
          password: configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
          database: configService.get<string>('MONGO_INIT_DATABASE'),
        };
        return {
          uri: `mongodb://${option.username}:${option.password}@${option.host}:${option.port}/${option.database}?authSource=admin&authMechanism=SCRAM-SHA-1`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
