import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/createTenant.dto';

@Controller('tenant')
export class ClientController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private clientService: TenantService) { }

    @Post()
    async createTenant(@Body() createTenantDto: CreateTenantDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newClient = await this.clientService.createTenant(createTenantDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(newClient);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get()
    async getClients(@Query() getQueryDto: GetQueryDto, @Res() res: Response) {
        const clients: any = await this.clientService.getTenants(getQueryDto);
        return res.status(HttpStatus.OK).send(clients);
    }

    @Get(':id')
    async getClientById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const tenant: any = await this.clientService.getTenantById(id);
        return res.status(HttpStatus.OK).send(tenant);
    }
}
