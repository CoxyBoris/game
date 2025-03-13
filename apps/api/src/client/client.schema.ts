import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Client extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organizationId: Types.ObjectId;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true, unique: true })
  contactEmail: string;

  @Prop()
  phone: string;

  @Prop({
    type: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  })
  billingAddress: Record<string, any>;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
