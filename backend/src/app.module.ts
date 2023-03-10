import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { BusinessModule } from './modules/business/business.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { ChannelModule } from './modules/channel/channel.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    BusinessModule,
    TenantModule,
    UserModule,
    AuthModule,
    ChannelModule,
    ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
