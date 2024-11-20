import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService],
})
export class AuthModule { }
