import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from 'src/entities/channel.entity';
import { TenantMiddleware } from 'src/middlewares/tenant.middleware';
import { ChannelRepository } from 'src/repositories/channel.repository';

import { UserModule } from '../user/user.module';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }])],
    controllers: [ChannelController],
    providers: [ChannelService, JwtService, ChannelRepository],
    exports: [ChannelService, ChannelRepository],
})
export class ChannelModule {
}
