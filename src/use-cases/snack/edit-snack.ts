import { SnackRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'

interface SnackEditUseCaseRequest {
  id: string
  name: string
  description: string
  insideDiet: boolean
  user_id: string
}

interface SnackEditUseCaseResponse {
  snack: Snack
}

export class SnackEditUseCase {
  constructor(private snacksRepository: SnackRepository) {}

  async execute(
    data: SnackEditUseCaseRequest,
  ): Promise<SnackEditUseCaseResponse> {
    const snack = await this.snacksRepository.edit(data)

    return {
      snack,
    }
  }
}
