import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { ProductRepository } from '../../repositories/business.repository';
import { CreateBusinessDto } from './dto/createBusiness.dto';
import { UpdateBusinessDto } from './dto/updateBusiness.dto';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) { }

    async createProduct(createBusinesstDto: CreateBusinessDto, session: ClientSession) {
        return await this.productRepository.createProduct(createBusinesstDto, session);
    }

    async getProductById(productId: MongooseSchema.Types.ObjectId) {
        return await this.productRepository.getProductById(productId);
    }

    async getProducts(getQueryDto: GetQueryDto, tenant_id: string) {
        return await this.productRepository.getProducts(getQueryDto, tenant_id);
    }

    async updateProduct(updateBusinessDto: UpdateBusinessDto, session: ClientSession) {
        return await this.productRepository.updateProduct(updateBusinessDto, session);
    }

    async deleteProductById(productId: MongooseSchema.Types.ObjectId) {
        return await this.productRepository.deleteProductById(productId);
    }
}
