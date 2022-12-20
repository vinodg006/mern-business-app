import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {


  use(req: Request, res: Response, next: NextFunction) {
    // Extract from the request object
    const { headers } = req;

    // Get the tenant id from header
    const tenantId = headers['X-TENANT-ID'] || headers['x-tenant-id'];

    if (!tenantId) {
      throw new HttpException('`X-TENANT-ID` not provided', HttpStatus.NOT_FOUND);
    }

    // Set the tenant id in the header
    req.body['tenant_id'] = tenantId.toString();

    next();
  }
}
