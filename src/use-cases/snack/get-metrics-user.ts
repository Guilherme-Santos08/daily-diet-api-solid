import { SnackRepository } from '@/repositories/snacks-repository'

interface GetMetricsUserUseCaseRequest {
  userId: string
}

interface GetMetricsUserUseCaseResponse {
  metrics: any
}

export class GetMetricsUserUseCase {
  constructor(private snackRepository: SnackRepository) {}

  async execute({
    userId,
  }: GetMetricsUserUseCaseRequest): Promise<GetMetricsUserUseCaseResponse> {
    const metrics = await this.snackRepository.getUserMetrics(userId)

    return {
      metrics,
    }
  }
}
