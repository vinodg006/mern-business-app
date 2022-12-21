import { BadRequestException, Body, Controller, Get, Query, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

import { CreateReviewDto } from './dto/createReview.dto';
import { ReviewService } from './review.service';
import { GetQueryDto } from 'src/dto/getQueryDto';

@UseGuards(AuthGuard('jwt'))
@Controller('review')
export class ReviewController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private reviewService: ReviewService) { }

    @Post()
    async createReview(@Body() CreateReviewDto: CreateReviewDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newBusiness: any = await this.reviewService.createReview(CreateReviewDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newBusiness);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get()
    async getAllChannel(@Query() getQueryDto: GetQueryDto, @Res() res: any, @Body() body: any) {
        const storages: any = await this.reviewService.getReviews(getQueryDto, body.channel_id);
        return res.status(HttpStatus.OK).send(storages);
    }
}
