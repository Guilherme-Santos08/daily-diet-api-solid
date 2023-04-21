import { SnackRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'

interface SnackGetOnlyUseCaseRequest {
  snackId: string
}

interface SnackGetOnlyUseCaseResponse {
  snack: Snack
}

export class SnackGetOnlyUseCase {
  constructor(private snackRepository: SnackRepository) {}

  async execute({
    snackId,
  }: SnackGetOnlyUseCaseRequest): Promise<SnackGetOnlyUseCaseResponse> {
    const snack = await this.snackRepository.findById(snackId)

    return {
      snack,
    }
  }
}
