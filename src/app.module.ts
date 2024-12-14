import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseService } from './common/services/response.service';
import auth from './config/auth.config';
import database from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, auth],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongo.uri')
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    LoggerModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule { }
