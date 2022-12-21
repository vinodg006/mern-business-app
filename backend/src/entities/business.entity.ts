import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Tenant } from './tenant.entity';

@Schema()
export class Business extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Tenant.name })
    tenant_id: MongooseSchema.Types.ObjectId;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String, default: 'ACTIVE' })
    status: string;

}

export const BusinessSchema = SchemaFactory.createForClass(Business);
// BusinessSchema.pre('find', function (thisx: Business, next: any) {
//     console.log(this, 'BusinessBusiness')
//     next();
// })
