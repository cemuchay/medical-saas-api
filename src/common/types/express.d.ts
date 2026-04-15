import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

declare global {
  namespace Express {
    // We merge our JwtPayload into the existing User interface
    type User = JwtPayload;

    interface Request {
      tenantId?: string;
    }
  }
}
