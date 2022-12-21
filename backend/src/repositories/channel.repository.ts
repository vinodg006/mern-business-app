import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Channel } from 'src/entities/channel.entity';

export class ChannelRepository {
    constructor(
        @InjectModel(Channel.name)
        private readonly channelModel: Model<Channel>,
    ) { }

    async createChannel(createChannelDto: any, session: ClientSession) {
        let channel = new this.channelModel(createChannelDto);

        try {
            channel = await channel.save({ session });
        } catch (error) {
            throw new InternalServerErrorException('Error al consultar la BD', error);
        }

        return channel;
    }
}
