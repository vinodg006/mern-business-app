import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantMiddleware } from 'src/middlewares/tenant.middleware';

import { Business, BusinessSchema } from '../../entities/business.entity';
import { ProductRepository } from '../../repositories/business.repository';
import { TenantModule } from '../tenant/client.module';
import { UserModule } from '../user/user.module';
import { BusinessController } from './business.controller';
import { ProductService } from './business.service';

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }])],
    controllers: [BusinessController],
    providers: [ProductService, ProductRepository, JwtService],
    exports: [ProductService, ProductRepository],
})
export class BusinessModule implements NestModule {
    configure(context: MiddlewareConsumer) {
        context.apply(TenantMiddleware).forRoutes(BusinessController);
    }
}
