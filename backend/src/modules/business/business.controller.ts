import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateBusinessDto } from './dto/createBusiness.dto';
import { UpdateBusinessDto } from './dto/updateBusiness.dto';
import { BusinessService } from './business.service';

@UseGuards(AuthGuard('jwt'))
@Controller('business')
export class BusinessController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private businessService: BusinessService) { }

    @Post()
    async createBusiness(@Body() createBusinessDto: CreateBusinessDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newBusiness: any = await this.businessService.createBusiness(createBusinessDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newBusiness);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Put(':id')
    async updateBusiness(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateBusinessDto: UpdateBusinessDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            updateBusinessDto.id = id;
            const newBusiness: any = await this.businessService.updateBusiness(updateBusinessDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newBusiness);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get(':id')
    async getBusinessById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage: any = await this.businessService.getBusinessById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @Delete(':id')
    async deleteBusinessById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage: any = await this.businessService.deleteBusinessById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @Get()
    async getAllBusinesss(@Query() getQueryDto: GetQueryDto, @Res() res: any, @Body() body: any) {
        const storages: any = await this.businessService.getBusinesss(getQueryDto, body.tenant_id);
        return res.status(HttpStatus.OK).send(storages);
    }
}
