import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tenant, TenantSchema } from '../../entities/tenant.entity';
import { User, UserSchema } from '../../entities/user.entity';
import { ClientRepository } from '../../repositories/tenant.repository';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
    ],
    providers: [ClientRepository],
    exports: [ClientRepository],
})
export class TenantModule { }
