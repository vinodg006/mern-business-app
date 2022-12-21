import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { ChannelRepository } from 'src/repositories/channel.repository';
import { CreateChannelDto } from './dto/createChannel.dto';

@Injectable()
export class ChannelService {
    constructor(private channelRepository: ChannelRepository) { }

    async createChannel(createChanneltDto: CreateChannelDto, session: ClientSession) {
        return await this.channelRepository.createChannel(createChanneltDto, session);
    }

    async getChannels(getQueryDto: GetQueryDto, business_id: string) {
        return await this.channelRepository.getChannels(getQueryDto, business_id);
    }

}
