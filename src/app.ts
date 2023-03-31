import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Dzscript',
    email: 'dz@dev.com.br',
    password_hash: '123456',
  },
})
