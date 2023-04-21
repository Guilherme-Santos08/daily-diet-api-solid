import { SnackRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'

interface SnackGetAllUserUseCaseRequest {
  userId: string
}

interface SnackGetAllUserUseCaseResponse {
  snack: Snack[]
}

export class SnackGetAllUserUseCase {
  constructor(private snackRepository: SnackRepository) {}

  async execute({
    userId,
  }: SnackGetAllUserUseCaseRequest): Promise<SnackGetAllUserUseCaseResponse> {
    const snack = await this.snackRepository.findManyByUserId(userId)

    return {
      snack,
    }
  }
}
