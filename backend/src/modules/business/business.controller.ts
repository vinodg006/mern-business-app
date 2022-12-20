import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateBusinessDto } from './dto/createBusiness.dto';
import { UpdateBusinessDto } from './dto/updateBusiness.dto';
import { ProductService } from './business.service';

@UseGuards(AuthGuard('jwt'))
@Controller('business')
export class BusinessController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private productService: ProductService) { }

    @Post()
    async createProduct(@Body() createBusinessDto: CreateBusinessDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newProduct: any = await this.productService.createProduct(createBusinessDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Put(':id')
    async updateProduct(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateBusinessDto: UpdateBusinessDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            updateBusinessDto.id = id;
            const newProduct: any = await this.productService.updateProduct(updateBusinessDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get(':id')
    async getProductById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage: any = await this.productService.getProductById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @Delete(':id')
    async deleteProductById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage: any = await this.productService.deleteProductById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @Get()
    async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: any, @Body() body: any) {
        // console.log(body, 'rq')
        const storages: any = await this.productService.getProducts(getQueryDto, body.tenant_id);
        return res.status(HttpStatus.OK).send(storages);
    }
}
