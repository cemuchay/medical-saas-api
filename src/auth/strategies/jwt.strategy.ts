import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET || 'a-string-secret-at-least-256-bits-long',
    });
  }

  // Passport automatically calls this and attaches the result to req.user
  validate(payload: JwtPayload): JwtPayload {
    if (!payload.tenantId) {
      throw new UnauthorizedException('Token is missing tenant context 🏥');
    }
    return payload;
  }
}
