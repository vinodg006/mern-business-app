import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';

import { Tenant, TenantSchema } from '../../entities/tenant.entity';
import { TenantRepository } from '../../repositories/tenant.repository';
import { UserModule } from '../user/user.module';
import { ClientController } from './tenant.controller';
import { TenantService } from './tenant.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
    ],
    controllers: [ClientController],
    providers: [TenantService, TenantRepository],
    exports: [TenantService, TenantRepository, MongooseModule],
})
export class TenantModule { }
