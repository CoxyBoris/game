import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * 📌 Find a user by ID (MongoDB _id)
   */
  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user;
  }

  /**
   * 📌 Find a user by Clerk User ID
   */
  async findByClerkId(clerkUserId: string): Promise<User> {
    return this.userModel.findOne({ clerkUserId }).exec();
  }

  /**
   * 📌 Create a new user
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  /**
   * 📌 Update an existing user
   */
  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) throw new NotFoundException(`User with ID ${userId} not found`);
    return updatedUser;
  }

  /**
   * 📌 Delete a user by ID
   */
  async deleteUser(userId: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(userId).exec();
    if (!result) throw new NotFoundException(`User with ID ${userId} not found`);
  }
}
