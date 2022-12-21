import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BusinessRepository } from 'src/repositories/business.repository';

@Injectable()
export class BusinessMiddleware implements NestMiddleware {

  constructor(private readonly businessRepository: BusinessRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // Extract from the request object
    const { headers } = req;

    // Get the business id from header
    const businessId: any = headers['X-BUSINESS-ID'] || headers['x-business-id'];

    if (!businessId) {
      throw new HttpException('`X-BUSINESS-ID` not provided', HttpStatus.NOT_FOUND);
    }

    const valid = await this.businessRepository.getBusinessById(businessId);

    // Set the business id in the header
    if (valid)
      req.body['business_id'] = businessId.toString();

    next();
  }
}
