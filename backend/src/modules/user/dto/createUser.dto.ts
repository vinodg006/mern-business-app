import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateUserDto {
    @IsOptional()
    tenant_id: MongooseSchema.Types.ObjectId;

    @IsOptional()
    id: MongooseSchema.Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: any;
}
