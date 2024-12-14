import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_EXP_TIME_IN_SECONDS } from 'src/common/constants/auth.constants';
import { ResponseService } from 'src/common/services/response.service';

import { LoggerModule } from '../logger/logger.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (
        {
          global: true,
          secret: configService.get<string>('auth.secret.jwtSecret'),
          signOptions: {
            expiresIn: JWT_EXP_TIME_IN_SECONDS,
          },
        }),
      inject: [ConfigService],
    }),
    LoggerModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ResponseService],
})
export class AuthModule { }
