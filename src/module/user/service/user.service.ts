import { Injectable } from '@nestjs/common';
import { HttpError } from '../../common/http-error';
import { User, UserDocument } from '../entity/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<UserDocument>,
  ) {}

  async getUser(username: string): Promise<User> {
    const findOne = await this.userRepository.findOne({
      where: {
        _id: username,
      },
    });

    if (findOne === null) {
      throw new HttpError(404, 'NOT_FOUND_USER');
    }

    return findOne;
  }

  async createUser(
    username: string,
    password: string,
    name: string,
  ): Promise<User> {
    if (await this.userRepository.exists({ _id: username }))
      throw new HttpError(409, 'ALREADY_EXIST_USER');

    const user = await new this.userRepository({
      _id: username,
      password,
      name,
      createdAt: new Date(),
    });

    return user.save();
  }

  async deleteUser(username: string): Promise<string> {
    await this.userRepository.deleteOne({ _id: username });
    return username;
  }
}
