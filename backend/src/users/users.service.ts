import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) {}

  async create(CreateUserDto: CreateUserDto) {
    return this.UserModel.create(CreateUserDto);
  }

  async findAll() {
    return this.UserModel.find();
  }

  async findByEmail(email: string) {
    return this.UserModel.findOne({ email: email });
  }
  async findById(id: string) {
    return this.UserModel.findOne({ _id: id });
  }
}
