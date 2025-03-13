import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Invoice', required: true })
  invoiceId: Types.ObjectId;

  @Prop({ required: true })
  gateway: string; // "stripe", "paypal", etc.

  @Prop({ required: true })
  gatewayPaymentId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop()
  paymentMethod: string;

  @Prop({ enum: ['pending', 'succeeded', 'failed', 'refunded'], default: 'pending' })
  status: string;

  @Prop()
  paidAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
