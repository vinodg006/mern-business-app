import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from 'src/entities/channel.entity';
import { BusinessMiddleware } from 'src/middlewares/business.middleware';
import { TenantMiddleware } from 'src/middlewares/tenant.middleware';
import { ChannelRepository } from 'src/repositories/channel.repository';
import { BusinessModule } from '../business/business.module';
import { TenantModule } from '../tenant/tenant.module';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
    imports: [TenantModule, BusinessModule, MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }])],
    controllers: [ChannelController],
    providers: [ChannelService, JwtService, ChannelRepository],
    exports: [ChannelService, ChannelRepository],
})
export class ChannelModule implements NestModule {
    configure(context: MiddlewareConsumer) {
        context.apply(TenantMiddleware).forRoutes(ChannelController).apply(BusinessMiddleware).forRoutes(ChannelController)
    }
}
