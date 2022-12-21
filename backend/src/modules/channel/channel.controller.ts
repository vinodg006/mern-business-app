import { BadRequestException, Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

import { CreateChannelDto } from './dto/createChannel.dto';
import { ChannelService } from './channel.service';

@UseGuards(AuthGuard('jwt'))
@Controller('channel')
export class ChannelController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private channelService: ChannelService) { }

    @Post()
    async createProduct(@Body() createChannelDto: CreateChannelDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newProduct: any = await this.channelService.createChannel(createChannelDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }
}
