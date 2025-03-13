import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../persistence/user.repository';
import { CreateUserDto, CreateUserSchema } from '../dto/create-user.dto';
import { UpdateUserDto, UpdateUserSchema } from '../dto/update-user.dto';
import { User } from '../persistence/user.schema';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  async getUserByClerkId(clerkUserId: string): Promise<User> {
    return this.userRepository.findByClerkId(clerkUserId);
  }

  async createUser(input: CreateUserDto): Promise<User> {
    try {
      const createUserDto = CreateUserSchema.parse(input);
      return this.userRepository.createUser(createUserDto);
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }

  async updateUser(userId: string, input: UpdateUserDto): Promise<User> {
    try {
      const updateUserDto = UpdateUserSchema.parse(input);
      return this.userRepository.updateUser(userId, updateUserDto);
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }

  async syncUserFromClerk(payload: any): Promise<User> {
    try {
      const { id, email_addresses, first_name, last_name, image_url, organization_id } = payload;
      const userDto: CreateUserDto = {
        clerkUserId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name} ${last_name}`,
        avatarUrl: image_url,
        organizationId: organization_id,
      };

      const parsedUser = CreateUserSchema.parse(userDto);

      const existingUser = await this.getUserByClerkId(id);
      if (existingUser) {
        return this.updateUser(existingUser._id as string, parsedUser);
      } else {
        return this.createUser(parsedUser);
      }
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }
}
