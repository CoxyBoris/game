import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Reminder extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Invoice', required: true })
  invoiceId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId;

  @Prop({ enum: ['email', 'sms', 'whatsapp'], required: true })
  reminderType: string;

  @Prop({ enum: ['pending', 'sent', 'failed'], default: 'pending' })
  status: string;

  @Prop()
  attemptNumber: number;

  @Prop()
  sentAt: Date;

  @Prop()
  response: string;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
