import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { CreateBusinessDto } from 'src/modules/business/dto/createBusiness.dto';
import { UpdateBusinessDto } from 'src/modules/business/dto/updateBusiness.dto';
import { GetQueryDto } from '../dto/getQueryDto';
import { Business } from '../entities/business.entity';

export class BusinessRepository {
    constructor(@InjectModel(Business.name) private readonly businessModel: Model<Business>) { }

    async createBusiness(createBusinessDto: CreateBusinessDto, session: ClientSession) {
        let business = new this.businessModel(createBusinessDto);
        try {
            business = await business.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return business;
    }

    async updateBusiness(updateBusiness: UpdateBusinessDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            ...updateBusiness,
            updatedAt: actualDate,
        };

        let business;
        try {
            business = await this.businessModel
                .findOneAndUpdate({ _id: updateBusiness.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!business) {
            throw new ConflictException('Error trying to update business');
        }

        return business;
    }

    async getBusinesss(query: GetQueryDto, tenant_id: string) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let businesss: Business[];

        try {
            if (limit === 0) {
                businesss = await this.businessModel
                    .find()
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                businesss = await this.businessModel
                    .find({ tenant_id })
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (businesss.length > 0) {
                response = {
                    ok: true,
                    data: businesss,
                    message: 'Get Businesss Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay businesss',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getBusinessById(id: MongooseSchema.Types.ObjectId) {
        let business;
        try {
            business = await this.businessModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!business) {
            throw new NotFoundException('The business with this id does not exist');
        }

        return business;
    }

    async deleteBusinessById(id: MongooseSchema.Types.ObjectId) {
        let business;
        try {
            business = await this.businessModel.findById(id).remove().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!business) {
            throw new NotFoundException('The business with this id does not exist');
        }

        return business;
    }
}
