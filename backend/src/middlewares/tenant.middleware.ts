import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TenantRepository } from 'src/repositories/tenant.repository';

@Injectable()
export class TenantMiddleware implements NestMiddleware {

  constructor(private readonly tenantRepository: TenantRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // Extract from the request object
    const { headers } = req;

    // Get the tenant id from header
    const tenantId: any = headers['X-TENANT-ID'] || headers['x-tenant-id'];

    if (!tenantId) {
      throw new HttpException('`X-TENANT-ID` not provided', HttpStatus.NOT_FOUND);
    }

    const valid = await this.tenantRepository.getTenantById(tenantId);

    // Set the tenant id in the header
    if (valid)
      req.body['tenant_id'] = tenantId.toString();

    next();
  }
}
