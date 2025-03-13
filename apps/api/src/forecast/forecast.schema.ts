import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Forecast extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId;

  @Prop({ required: true })
  month: string; // YYYY-MM

  @Prop({ required: true })
  predictedRevenue: number;

  @Prop({ required: true })
  confirmedRevenue: number;

  @Prop({ required: true })
  overdueAmount: number;

  @Prop({ required: true })
  predictionAccuracy: number; // Confidence score (0-100)
}

export const ForecastSchema = SchemaFactory.createForClass(Forecast);
