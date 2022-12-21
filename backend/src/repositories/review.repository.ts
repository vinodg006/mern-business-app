import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Review } from 'src/entities/review.entity';

export class ReviewRepository {
    constructor(
        @InjectModel(Review.name)
        private readonly reviewModel: Model<Review>,
    ) { }

    async createReview(createReviewDto: any, session: ClientSession) {
        let review = new this.reviewModel(createReviewDto);

        try {
            review = await review.save({ session });
        } catch (error) {
            throw new InternalServerErrorException('Error al consultar la BD', error);
        }

        return review;
    }
}
