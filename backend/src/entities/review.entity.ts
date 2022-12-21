import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Channel } from './channel.entity';
import { Tenant } from './tenant.entity';


@Schema()
export class Review extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Tenant.name })
    tenant_id: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Channel.name })
    channel_id: MongooseSchema.Types.ObjectId;

    @Prop({ required: false })
    platform: string;

    @Prop({ required: false })
    rating: number;

    @Prop({ required: false })
    review: string;

    @Prop({ required: false })
    createdAt: Date;

    @Prop({ required: false, type: MongooseSchema.Types.Mixed })
    reviewer;

    @Prop({ required: false, type: Object })
    responses: object;

    @Prop({ required: false })
    sentiment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
