import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { SnackDeleteUseCase } from '../snack/delete-snack'

export function makeDeleteSnackUseCase() {
  const snackRepository = new PrismaSnacksRepository()
  const useCase = new SnackDeleteUseCase(snackRepository)

  return useCase
}
