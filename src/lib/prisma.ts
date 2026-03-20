import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function makePrisma(): PrismaClient {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool as any);
    return new PrismaClient({ adapter });
}

// Lazy getter: only creates the client when first accessed
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
    get(_target, prop: string | symbol) {
        if (!globalForPrisma.prisma) {
            globalForPrisma.prisma = makePrisma();
        }
        return Reflect.get(globalForPrisma.prisma, prop);
    },
});
