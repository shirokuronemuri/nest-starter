import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/core/services/logger/logger.service';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const adapter = new PrismaPg({
      connectionString: config.get<string>('dbUrl'),
    });
    super({ adapter, log: ['info', 'warn', 'error'] });
  }
  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      this.logger.log('Prisma connected to PostgreSQL', DatabaseService.name);
    } catch (err) {
      const isErrObject = err instanceof Error;
      this.logger.error(
        `Prisma connection error: ${isErrObject ? err.message : err}`,
        isErrObject ? err.stack : undefined,
        DatabaseService.name,
      );
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected from PostgreSQL');
  }
}
