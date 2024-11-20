import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
