import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Tenant } from '../entities/tenant.entity';

export class TenantRepository {
    constructor(
        @InjectModel(Tenant.name)
        private readonly tenantModel: Model<Tenant>,
    ) { }

    async createTenant(createTenantDto: any, session: ClientSession) {
        let tenant = await this.getTenantByName(createTenantDto.name);

        // if (tenant) {
        //     throw new ConflictException('Tenant Already Exists!');
        // }

        tenant = new this.tenantModel({
            name: createTenantDto.name,
            user: createTenantDto.userId,
        });

        try {
            tenant = await tenant.save({ session });
        } catch (error) {
            throw new InternalServerErrorException('Error al consultar la BD', error);
        }

        return tenant;
    }

    async getTenants(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let tenants: Tenant[];

        try {
            if (limit === 0) {
                tenants = await this.tenantModel
                    .find()
                    .populate('tenant')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                tenants = await this.tenantModel
                    .find()
                    .populate('tenant')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (tenants.length > 0) {
                response = {
                    ok: true,
                    data: tenants,
                    message: 'Get Tenants Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay tenantes',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Error al intentar consultar los tenantes', error);
        }
    }

    async getTenantById(id: MongooseSchema.Types.ObjectId) {
        let tenant;
        try {
            tenant = await this.tenantModel.findById(id).exec();
        } catch (error) {
            throw new Error(error);
        }

        if (!tenant) {
            throw new NotFoundException('The tenant with this id does not exist');
        }

        return tenant;
    }

    async getTenantByName(name: string): Promise<Tenant> {
        let tenant;

        try {
            tenant = await this.tenantModel.find({ name });
        } catch (error) {
            throw new InternalServerErrorException('Error connecting to MongoDB', error);
        }

        return tenant;
    }
}
