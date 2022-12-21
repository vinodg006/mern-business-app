import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
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

    async getChannelById(id: MongooseSchema.Types.ObjectId) {
        let channel;
        try {
            channel = await this.channelModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!channel) {
            throw new NotFoundException('The channel with this id does not exist');
        }

        return channel;
    }

    async getChannels(query: GetQueryDto, business_id: string) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let channels: Channel[];

        try {
            if (limit === 0) {
                channels = await this.channelModel
                    .find()
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                channels = await this.channelModel
                    .find({ business_id })
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (channels.length > 0) {
                response = {
                    ok: true,
                    data: channels,
                    message: 'Get Channels Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay channels',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
