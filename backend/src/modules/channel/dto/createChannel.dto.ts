import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateChannelDto {
    tenant_id: MongooseSchema.Types.ObjectId;

    business_id: MongooseSchema.Types.ObjectId;

    status: string;

    platform: string;

    authType: string;

    auth: object;

    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
}
