import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
// import { withPulse } from '@prisma/extension-pulse';

// export default new PrismaClient({
//   log: process.env.NODE_ENV === 'development' ? ['query'] : [],
// }).$extends(withAccelerate()).$extends(
//   withPulse({
//     apiKey: process.env.PULSE_API_KEY
//   })
// );

export default new PrismaClient()
.$extends(withAccelerate())
// .$extends(withPulse({ apiKey: process.env.PULSE_API_KEY }))
