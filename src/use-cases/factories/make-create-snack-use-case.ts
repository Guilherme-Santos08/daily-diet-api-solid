import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { SnackCreateUseCase } from '../snack/create-snack'

export function makeCreateSnackUseCase() {
  const snackRepository = new PrismaSnacksRepository()
  const useCase = new SnackCreateUseCase(snackRepository)

  return useCase
}
