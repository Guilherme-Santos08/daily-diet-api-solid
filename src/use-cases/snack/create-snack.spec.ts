import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySnackRepository } from '@/repositories/in-memory/in-memory-snack-repository'
import { SnackCreateUseCase } from './create-snack'

let snackRepository: InMemorySnackRepository
let sut: SnackCreateUseCase

describe('Snack be able to check in', async () => {
  beforeEach(() => {
    snackRepository = new InMemorySnackRepository()
    sut = new SnackCreateUseCase(snackRepository)
  })

  it('should be able to register snack', async () => {
    const { snack } = await sut.execute({
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      insideDiet: true,
      userId: 'user-01',
    })

    expect(snack.id).toEqual(expect.any(String))
  })
})
