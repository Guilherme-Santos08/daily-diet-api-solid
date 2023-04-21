import { SnackRepository } from '@/repositories/snacks-repository'

interface SnackDeleteUseCaseRequest {
  snackId: string
}

export class SnackDeleteUseCase {
  constructor(private snackRepository: SnackRepository) {}

  async execute({ snackId }: SnackDeleteUseCaseRequest) {
    await this.snackRepository.delete(snackId)
  }
}
