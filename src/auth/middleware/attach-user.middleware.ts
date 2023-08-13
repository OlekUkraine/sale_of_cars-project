import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AttachUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.user = req['user'];
    next();
  }
}
