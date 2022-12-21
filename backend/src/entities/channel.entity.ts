import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Business } from './business.entity';
import { Tenant } from './tenant.entity';


@Schema()
export class Channel extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Business.name })
    business_id: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Tenant.name })
    tenant_id: MongooseSchema.Types.ObjectId;

    @Prop({ required: false, default: 'ACTIVE' })
    status: string;

    @Prop({ required: false })
    platform: string;

    @Prop({ required: false })
    authType: string;

    @Prop({ required: false, type: Object })
    auth: object;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
