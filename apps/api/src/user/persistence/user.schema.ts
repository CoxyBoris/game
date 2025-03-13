import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true })
    clerkUserId: string;
  
    @Prop({ required: true, unique: true })
    email: string;
  
    @Prop()
    name: string;
  
    @Prop()
    avatarUrl: string;
  
    @Prop({ type: Types.ObjectId, ref: 'Organization' })
    organizationId: Types.ObjectId;
  
    @Prop({ enum: ['admin', 'member', 'accountant'], default: 'member' })
    role: string;
  }
  
  export const UserSchema = SchemaFactory.createForClass(User);