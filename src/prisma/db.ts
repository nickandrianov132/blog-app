import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import contractJson from './contract.json' with { type: 'json' };
import type { Contract } from './contract.d'; // Загружает типы контракта (без расширения)

// 1. Преобразуем JSON-схему в валидный контракт для рантайма
export const contract = contractFromJson<Contract>(contractJson);

// 2. Создаем функцию инициализации клиента с правильным ключом 'contract'
const createPrismaClient = () => {
  return postgres({
    contract, // Передаем скомпилированный контракт
    url: process.env.DATABASE_URL!,
  });
};

// 3. Организуем Singleton-обертку для Next.js Hot Reload
type PrismaClientType = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
