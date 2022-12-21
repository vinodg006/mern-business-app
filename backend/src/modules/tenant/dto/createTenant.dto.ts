import { IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateTenantDto {
    @IsNotEmpty()
    userId: MongooseSchema.Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    status: string;

    @IsString()
    subscriptionPlan: string;

    @IsString()
    billingCycle: string;

    @IsDate()
    subscriptionStart: Date;

    @IsDate()
    subscriptionEnd: Date;

    @IsObject()
    billing: object;
}
