import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './entities/organization.entity';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserSchema } from './../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Organization', schema: OrganizationSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, UserService, JwtService],
})
export class OrganizationModule { }
