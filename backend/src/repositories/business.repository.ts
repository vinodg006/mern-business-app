import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { CreateBusinessDto } from 'src/modules/business/dto/createBusiness.dto';
import { UpdateBusinessDto } from 'src/modules/business/dto/updateBusiness.dto';
import { GetQueryDto } from '../dto/getQueryDto';
import { Business } from '../entities/business.entity';

export class ProductRepository {
    constructor(@InjectModel(Business.name) private readonly productModel: Model<Business>) { }

    async createProduct(createBusinessDto: CreateBusinessDto, session: ClientSession) {
        let product = new this.productModel(createBusinessDto);
        try {
            product = await product.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return product;
    }

    async updateProduct(updateProduct: UpdateBusinessDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            ...updateProduct,
            updatedAt: actualDate,
        };

        let product;
        try {
            product = await this.productModel
                .findOneAndUpdate({ _id: updateProduct.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new ConflictException('Error trying to update product');
        }

        return product;
    }

    async getProducts(query: GetQueryDto, tenant_id: string) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let products: Business[];

        try {
            if (limit === 0) {
                products = await this.productModel
                    .find()
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                products = await this.productModel
                    .find({ tenant_id })
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (products.length > 0) {
                response = {
                    ok: true,
                    data: products,
                    message: 'Get Products Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay products',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getProductById(id: MongooseSchema.Types.ObjectId) {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new NotFoundException('The product with this id does not exist');
        }

        return product;
    }

    async deleteProductById(id: MongooseSchema.Types.ObjectId) {
        let product;
        try {
            product = await this.productModel.findById(id).remove().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new NotFoundException('The product with this id does not exist');
        }

        return product;
    }
}
