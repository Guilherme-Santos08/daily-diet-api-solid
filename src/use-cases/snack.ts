import { SnackRepository } from '@/repositories/snacks-repository'
import { Snack } from '@prisma/client'

interface SnackUseCaseRequest {
  id?: string
  userId: string
  name: string
  description: string
  insideDiet: boolean
}

interface SnackUseCaseResponse {
  snack: Snack
}

export class SnackUseCase {
  constructor(private snackRepository: SnackRepository) {}

  async execute({
    name,
    description,
    insideDiet,
    userId,
  }: SnackUseCaseRequest): Promise<SnackUseCaseResponse> {
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

  async updateSnack({
    id,
    name,
    description,
    insideDiet,
    userId,
  }: SnackUseCaseRequest) {
    const snack = await this.snackRepository.edit({
      id,
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
