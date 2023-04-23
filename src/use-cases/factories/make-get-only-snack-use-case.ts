import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { SnackGetOnlyUseCase } from '../snack/get-only-snack'

export function makeGetOnlyUserSnackUseCase() {
  const snackRepository = new PrismaSnacksRepository()
  const useCase = new SnackGetOnlyUseCase(snackRepository)

  return useCase
}
