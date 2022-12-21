import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/entities/review.entity';
import { ChannelMiddleware } from 'src/middlewares/channel.middleware';
import { TenantMiddleware } from 'src/middlewares/tenant.middleware';
import { ReviewRepository } from 'src/repositories/review.repository';
import { ChannelModule } from '../channel/channel.module';
import { TenantModule } from '../tenant/tenant.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
    imports: [TenantModule, ChannelModule, MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
    controllers: [ReviewController],
    providers: [ReviewService, JwtService, ReviewRepository],
    exports: [ReviewService, ReviewRepository],
})
export class ReviewModule implements NestModule {
    configure(context: MiddlewareConsumer) {
        context.apply(TenantMiddleware).forRoutes(ReviewController).apply(ChannelMiddleware).forRoutes(ReviewController)
    }
}