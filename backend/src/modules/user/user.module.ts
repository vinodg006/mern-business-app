import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from 'src/entities/tenant.entity';
import { TenantRepository } from 'src/repositories/tenant.repository';

import { User, UserSchema } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { TenantModule } from '../tenant/tenant.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [forwardRef(() => TenantModule), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule { }
