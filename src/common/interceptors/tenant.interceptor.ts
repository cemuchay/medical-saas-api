// src/common/interceptors/tenant.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Explicitly cast request.user to our JwtPayload interface
    const user = request.user as JwtPayload | undefined;

    if (user?.tenantId) {
      request.tenantId = user.tenantId;
    }

    return next.handle();

    return next.handle();
  }
}
