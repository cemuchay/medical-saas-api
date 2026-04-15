import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

export interface AuthenticatedRequest extends Request {
  tenantId: string;
  user: JwtPayload;
}
