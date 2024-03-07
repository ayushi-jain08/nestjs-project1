// order.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Order {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    productId: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true, default: 'pending' })
    status: string; // Example: 'pending', 'completed'

    // Add other properties as needed
}

export const OrderSchema = SchemaFactory.createForClass(Order);
