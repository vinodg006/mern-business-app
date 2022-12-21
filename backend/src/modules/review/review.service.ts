import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { ReviewRepository } from 'src/repositories/review.repository';
import { CreateReviewDto } from './dto/createReview.dto';

@Injectable()
export class ReviewService {
    constructor(private reviewRepository: ReviewRepository) { }

    async createReview(createReviewtDto: CreateReviewDto, session: ClientSession) {
        return await this.reviewRepository.createReview(createReviewtDto, session);
    }

}
