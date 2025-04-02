import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Integration extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  type: 'stripe' | 'notion' | 'xero';

  @Prop()
  accountId: string;

  @Prop()
  accessToken?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const IntegrationSchema = SchemaFactory.createForClass(Integration);
