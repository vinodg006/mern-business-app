import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from 'src/entities/tenant.entity';
import { ClientRepository } from 'src/repositories/tenant.repository';

import { User, UserSchema } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { TenantModule } from '../tenant/client.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }])],
    controllers: [UserController],
    providers: [UserService, UserRepository, ClientRepository, TenantModule],
    exports: [UserService, UserRepository],
})
export class UserModule { }
