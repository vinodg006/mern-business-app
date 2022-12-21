import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
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

    async getReviews(query: GetQueryDto, channel_id: string) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let reviews: Review[];

        try {
            if (limit === 0) {
                reviews = await this.reviewModel
                    .find()
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                reviews = await this.reviewModel
                    .find({ channel_id })
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (reviews.length > 0) {
                response = {
                    ok: true,
                    data: reviews,
                    message: 'Get Reviews Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay reviews',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
