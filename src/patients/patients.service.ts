import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, query: any) {
    const { name, search } = query;

    // Build the dynamic filter object
    const where: Prisma.PatientWhereInput = {
      tenantId, // Always forced for security 🔒
    };

    // If 'name' is provided in URL: ?name=chizalam
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive', // Don't care about uppercase/lowercase
      };
    }

    // If a general 'search' is provided: ?search=fever
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        // We can't easily 'contains' on JSON history, but we can search names
      ];
    }

    return this.prisma.patient.findMany({
      where,
      orderBy: { name: 'asc' }, // Keep it organized
    });
  }

  async create(tenantId: string, name: string) {
    return this.prisma.patient.create({
      data: {
        name,
        tenantId,
      },
    });
  }
}
