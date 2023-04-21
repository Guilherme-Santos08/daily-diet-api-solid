import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySnackRepository } from '@/repositories/in-memory/in-memory-snack-repository'
import { GetMetricsUserUseCase } from './get-metrics-user'
import { SnackNotFound } from '../errors/snack-not-found'

let snackRepository: InMemorySnackRepository
let sut: GetMetricsUserUseCase

describe('User be able to get metrics', async () => {
  beforeEach(() => {
    snackRepository = new InMemorySnackRepository()
    sut = new GetMetricsUserUseCase(snackRepository)
  })

  it('should be able to get metric', async () => {
    for (let index = 0; index < 10; index += 1) {
      await snackRepository.create({
        name: 'Macarrão',
        description: 'Macarrão ao melho bombole',
        insideDiet: true,
        user_id: 'user-01',
      })
    }

    const { metrics } = await sut.execute({ userId: 'user-01' })

    expect(metrics.total).toEqual(10)
    expect(metrics.snackOnTheDiet).toEqual(10)
    expect(metrics.snackOffTheDiet).toEqual(0)
    expect(metrics.bestSequence).toEqual(10)
  })

  it('should not be able to get metric', async () => {
    await expect(() =>
      snackRepository.getUserMetrics('non-existing-id'),
    ).rejects.toBeInstanceOf(SnackNotFound)
  })
})
