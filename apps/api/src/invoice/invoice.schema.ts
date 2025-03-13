import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ enum: ['pending', 'paid', 'overdue', 'failed'], default: 'pending' })
  status: string;

  @Prop({
    type: [
      {
        gateway: { type: String, required: true },
        allowed: { type: Boolean, default: false },
      },
    ],
  })
  paymentOptions: Record<string, any>[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
