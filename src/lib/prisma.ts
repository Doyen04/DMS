import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient} from '/app/generated/prisma-client'

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient;
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient().$extends(withAccelerate());
  }
  prisma = (global as any).prisma;
}

export default prisma;
