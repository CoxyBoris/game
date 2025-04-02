import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Integration } from './integration.schema';
import { Model, Types, DeleteResult } from 'mongoose';

@Injectable()
export class IntegrationRepository {
  constructor(
    @InjectModel(Integration.name)
    private readonly integrationModel: Model<Integration>,
  ) {}

  async findByUser(userId: string) {
    return this.integrationModel.find({ userId: new Types.ObjectId(userId) });
  }

  async findOne(userId: string, type: string) {
    return this.integrationModel.findOne({
      userId: new Types.ObjectId(userId),
      type,
    });
  }

  async createOrUpdate(userId: string, type: string, data: Partial<Integration>) {
    return this.integrationModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), type },
      {
        userId: new Types.ObjectId(userId),
        type,
        ...data,
      },
      { upsert: true, new: true },
    );
  }

  async delete(userId: string, type: string): Promise<DeleteResult> {
    return this.integrationModel.deleteOne({
      userId: new Types.ObjectId(userId),
      type,
    });
  }
}
