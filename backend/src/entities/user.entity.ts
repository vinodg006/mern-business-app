import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Tenant } from './tenant.entity';

@Schema()
export class User extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Tenant.name })
    tenant_id: MongooseSchema.Types.ObjectId;

    @Prop({ required: false, default: 'ACTIVE' })
    status: string;

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    password: string;

    @Prop({ required: true, enum: ['ADMIN', 'USER'] })
    role: string;

    @Prop({ required: false, type: Object })
    preferences: object;
}

export const UserSchema = SchemaFactory.createForClass(User);
