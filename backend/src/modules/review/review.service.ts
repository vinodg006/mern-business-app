import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { ReviewRepository } from 'src/repositories/review.repository';
import { CreateReviewDto } from './dto/createReview.dto';

@Injectable()
export class ReviewService {
    constructor(private reviewRepository: ReviewRepository) { }

    async createReview(createReviewtDto: CreateReviewDto, session: ClientSession) {
        return await this.reviewRepository.createReview(createReviewtDto, session);
    }

    async getReviews(getQueryDto: GetQueryDto, channel_id: string) {
        return await this.reviewRepository.getReviews(getQueryDto, channel_id);
    }

}
