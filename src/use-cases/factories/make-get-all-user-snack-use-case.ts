import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { SnackGetAllUserUseCase } from '../snack/get-all-user-snacks'

export function makeGetAllUserSnackUseCase() {
  const snackRepository = new PrismaSnacksRepository()
  const useCase = new SnackGetAllUserUseCase(snackRepository)

  return useCase
}
