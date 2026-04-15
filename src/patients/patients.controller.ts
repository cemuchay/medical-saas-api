import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client'; // 👈 Import Prisma for JsonObject
import { AuditService } from 'src/audit/audit.service';
import type { AuthenticatedRequest } from 'src/common/types/request.interface';
import { TenantInterceptor } from '../common/interceptors/tenant.interceptor';
import { PatientsService } from './patients.service';

@Controller('patients')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(TenantInterceptor)
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly auditService: AuditService,
  ) {}

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest,
    @Query() query: Record<string, string | undefined>, // 👈 Fixes unsafe 'any'
  ) {
    return this.patientsService.findAll(req.tenantId, query);
  }

  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body('name') name: string) {
    // 1. Guard against undefined user to satisfy TS
    if (!req.user) {
      throw new UnauthorizedException('User context missing');
    }

    // 2. Cast to JwtPayload after the guard
    const user = req.user;

    const patient = await this.patientsService.create(req.tenantId, name);

    // 3. Fixes the "Unsafe assignment" error for Prisma metadata
    const logMetadata: Prisma.JsonObject = {
      patientId: patient.id,
      patientName: name,
    };

    // 4. Log the action with safe types
    await this.auditService.createLog({
      tenantId: req.tenantId,
      userId: user.sub,
      action: 'CREATE_PATIENT',
      resource: 'Patient',
      metadata: logMetadata,
    });

    return patient;
  }
}
