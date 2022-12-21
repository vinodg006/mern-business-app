import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { TenantRepository } from '../../repositories/tenant.repository';
import { UserService } from '../user/user.service';
import { CreateTenantDto } from './dto/createTenant.dto';

@Injectable()
export class TenantService {
    constructor(private readonly tenantRepository: TenantRepository, private readonly userService: UserService) { }

    async createTenant(createTenantDto: CreateTenantDto, session: ClientSession) {
        const getUser: any = await this.userService.getUserById(createTenantDto.userId);

        if (getUser.role === 'ADMIN') {
            return await this.tenantRepository.createTenant(createTenantDto, session);
        } else {
            throw new UnauthorizedException('Incorrect Role');
        }
    }

    async getTenants(getQueryDto: GetQueryDto) {
        return await this.tenantRepository.getTenants(getQueryDto);
    }

    async getTenantById(id: MongooseSchema.Types.ObjectId) {
        return await this.tenantRepository.getTenantById(id);
    }
}
