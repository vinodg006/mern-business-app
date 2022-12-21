import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/entities/review.entity';
import { TenantMiddleware } from 'src/middlewares/tenant.middleware';
import { ReviewRepository } from 'src/repositories/review.repository';

import { UserModule } from '../user/user.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
    controllers: [ReviewController],
    providers: [ReviewService, JwtService, ReviewRepository],
    exports: [ReviewService, ReviewRepository],
})
export class ReviewModule {
}
