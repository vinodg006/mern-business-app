import { BadRequestException, Body, Controller, HttpStatus, Post, Res, Get, Query, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

import { CreateChannelDto } from './dto/createChannel.dto';
import { ChannelService } from './channel.service';
import { GetQueryDto } from 'src/dto/getQueryDto';

@UseGuards(AuthGuard('jwt'))
@Controller('channel')
export class ChannelController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private channelService: ChannelService) { }

    @Post()
    async createBusiness(@Body() createChannelDto: CreateChannelDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newBusiness: any = await this.channelService.createChannel(createChannelDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newBusiness);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @Get()
    async getAllChannel(@Query() getQueryDto: GetQueryDto, @Res() res: any, @Body() body: any) {
        const storages: any = await this.channelService.getChannels(getQueryDto, body.business_id);
        return res.status(HttpStatus.OK).send(storages);
    }
}
