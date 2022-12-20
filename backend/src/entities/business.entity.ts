import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Tenant } from './tenant.entity';
import { User } from './user.entity';

@Schema()
export class Business extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: User.name })
    user_id: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Tenant.name })
    tenant_id: MongooseSchema.Types.ObjectId;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Object })
    config: string;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
// BusinessSchema.pre('find', function (thisx: Business, next: any) {
//     console.log(this, 'BusinessBusiness')
//     next();
// })
