import { BadRequestException, Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

import { CreateReviewDto } from './dto/createReview.dto';
import { ReviewService } from './review.service';

@UseGuards(AuthGuard('jwt'))
@Controller('review')
export class ReviewController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private reviewService: ReviewService) { }

    @Post()
    async createReview(@Body() CreateReviewDto: CreateReviewDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newProduct: any = await this.reviewService.createReview(CreateReviewDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }
}
