import { SnackRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'

interface SnackCreateUseCaseRequest {
  userId: string
  name: string
  description: string
  insideDiet: boolean
}

interface SnackCreateUseCaseResponse {
  snack: Snack
}

export class SnackCreateUseCase {
  constructor(private snackRepository: SnackRepository) {}

  async execute({
    name,
    description,
    insideDiet,
    userId,
  }: SnackCreateUseCaseRequest): Promise<SnackCreateUseCaseResponse> {
    const snack = await this.snackRepository.create({
      user_id: userId,
      name,
      description,
      insideDiet,
    })

    return {
      snack,
    }
  }
}
