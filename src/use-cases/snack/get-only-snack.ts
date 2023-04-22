import { SnackRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'

interface SnackGetOnlyUseCaseRequest {
  snackId: string
  userId: string
}

interface SnackGetOnlyUseCaseResponse {
  snack: Snack
}

export class SnackGetOnlyUseCase {
  constructor(private snackRepository: SnackRepository) {}

  async execute({
    snackId,
    userId,
  }: SnackGetOnlyUseCaseRequest): Promise<SnackGetOnlyUseCaseResponse> {
    const snack = await this.snackRepository.findById(snackId, userId)

    return {
      snack,
    }
  }
}
