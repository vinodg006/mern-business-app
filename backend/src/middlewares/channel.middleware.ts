import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ChannelRepository } from 'src/repositories/channel.repository';

@Injectable()
export class ChannelMiddleware implements NestMiddleware {

  constructor(private readonly channelRepository: ChannelRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // Extract from the request object
    const { headers } = req;

    // Get the channel id from header
    const channelId: any = headers['X-CHANNEL-ID'] || headers['x-channel-id'];

    if (!channelId) {
      throw new HttpException('`X-CHANNEL-ID` not provided', HttpStatus.NOT_FOUND);
    }

    const valid = await this.channelRepository.getChannelById(channelId);

    // Set the channel id in the header
    if (valid)
      req.body['channel_id'] = channelId.toString();

    next();
  }
}
