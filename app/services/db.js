import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

export default new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
}).$extends(withAccelerate());
