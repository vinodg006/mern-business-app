import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateReviewDto {
    tenant_id: MongooseSchema.Types.ObjectId;

    channel_id: MongooseSchema.Types.ObjectId;

    platform: string;

    rating: number;

    review: string;

    createdAt: Date;

    reviewer: object;

    responses: object;

    sentiment: string;

    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
}
