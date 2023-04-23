import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { SnackEditUseCase } from '../snack/edit-snack'

export function makeEditSnackUseCase() {
  const snackRepository = new PrismaSnacksRepository()
  const useCase = new SnackEditUseCase(snackRepository)

  return useCase
}
