import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Tenant extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false, default: 'ACTIVE' })
    status: string;

    @Prop({ required: false, default: 'BASIC' })
    subscriptionPlan: string;

    @Prop({ required: false, default: 'MONTHLY' })
    billingCycle: string;

    @Prop({ required: false, default: Date.now })
    subscriptionStart: Date;

    @Prop({ required: false, default: Date.now })
    subscriptionEnd: Date;

    @Prop({ required: false, type: Object, default: {} })
    billing: object;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
