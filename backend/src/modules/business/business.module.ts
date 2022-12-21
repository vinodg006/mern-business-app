import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantMiddleware } from 'src/middlewares/tenant.middleware';

import { Business, BusinessSchema } from '../../entities/business.entity';
import { BusinessRepository } from '../../repositories/business.repository';
import { TenantModule } from '../tenant/tenant.module';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
    imports: [forwardRef(() => TenantModule), MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }])],
    controllers: [BusinessController],
    providers: [BusinessService, BusinessRepository, JwtService],
    exports: [BusinessService, BusinessRepository],
})
export class BusinessModule implements NestModule {
    configure(context: MiddlewareConsumer) {
        context.apply(TenantMiddleware).forRoutes(BusinessController);
    }
}
