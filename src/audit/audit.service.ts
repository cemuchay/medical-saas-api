import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, AuditLog } from '@prisma/client';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async createLog(data: {
    tenantId: string;
    userId: string;
    action: string;
    resource: string;
    metadata?: Prisma.JsonObject;
  }): Promise<AuditLog> {
    // Use the 'connect' pattern or 'tenantId' if it's exposed
    const log = await this.prisma.auditLog.create({
      data: {
        action: data.action,
        resource: data.resource,
        userId: data.userId,
        metadata: data.metadata ?? Prisma.JsonNull,
        // Prisma prefers connecting via the relation name
        tenant: {
          connect: { id: data.tenantId },
        },
      },
    });

    return log;
  }
}
