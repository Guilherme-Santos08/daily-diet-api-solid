import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { GetMetricsUserUseCase } from '../snack/get-metrics-user'

export function makeGetUserMetricsUseCase() {
  const snackRepository = new PrismaSnacksRepository()
  const useCase = new GetMetricsUserUseCase(snackRepository)

  return useCase
}
