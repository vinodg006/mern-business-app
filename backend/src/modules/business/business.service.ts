import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { BusinessRepository } from '../../repositories/business.repository';
import { CreateBusinessDto } from './dto/createBusiness.dto';
import { UpdateBusinessDto } from './dto/updateBusiness.dto';

@Injectable()
export class BusinessService {
    constructor(private businessRepository: BusinessRepository) { }

    async createBusiness(createBusinesstDto: CreateBusinessDto, session: ClientSession) {
        return await this.businessRepository.createBusiness(createBusinesstDto, session);
    }

    async getBusinessById(businessId: MongooseSchema.Types.ObjectId) {
        return await this.businessRepository.getBusinessById(businessId);
    }

    async getBusinesss(getQueryDto: GetQueryDto, tenant_id: string) {
        return await this.businessRepository.getBusinesss(getQueryDto, tenant_id);
    }

    async updateBusiness(updateBusinessDto: UpdateBusinessDto, session: ClientSession) {
        return await this.businessRepository.updateBusiness(updateBusinessDto, session);
    }

    async deleteBusinessById(businessId: MongooseSchema.Types.ObjectId) {
        return await this.businessRepository.deleteBusinessById(businessId);
    }
}
