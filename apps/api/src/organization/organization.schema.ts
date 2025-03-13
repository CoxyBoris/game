import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Organization extends Document {
  @Prop({ required: true, unique: true })
  clerkOrgId: string;

  @Prop({ unique: true })
  stripeAccountId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  businessEmail: string;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop({ default: 'US' })
  country: string;

  @Prop({ enum: ['free', 'pro'], default: 'free' })
  subscriptionPlan: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);