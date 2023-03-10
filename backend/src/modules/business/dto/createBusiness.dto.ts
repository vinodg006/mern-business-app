import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateBusinessDto {

    @IsNotEmpty()
    tenant_id: MongooseSchema.Types.ObjectId;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
}
