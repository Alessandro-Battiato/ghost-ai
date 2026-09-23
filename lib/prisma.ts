import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// This is a cached singleton to prevent multiple instantiations
let prisma: PrismaClient

if (process.env.DATABASE_URL?.startsWith('prisma+postgres://')) {
  // Use Prisma Accelerate
  if (!prisma) {
    prisma = new PrismaClient()
  }
} else {
  // Use direct adapter for PostgreSQL
  const adapter = new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL }))
  if (!prisma) {
    prisma = new PrismaClient({ adapter })
  }
}

export default prisma