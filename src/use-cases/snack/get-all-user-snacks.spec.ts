import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySnackRepository } from '@/repositories/in-memory/in-memory-snack-repository'
import { SnackGetAllUserUseCase } from './get-all-user-snacks copy'
import { SnackNotFound } from '../errors/snack-not-found'

let snackRepository: InMemorySnackRepository
let sut: SnackGetAllUserUseCase

describe('User be able to get all snacks', async () => {
  beforeEach(() => {
    snackRepository = new InMemorySnackRepository()
    sut = new SnackGetAllUserUseCase(snackRepository)
  })

  it('should be able to get all snack', async () => {
    for (let index = 0; index < 10; index += 1) {
      await snackRepository.create({
        name: 'Macarrão',
        description: 'Macarrão ao melho bombole',
        insideDiet: true,
        user_id: 'user-01',
      })
    }

    const { snack } = await sut.execute({ userId: 'user-01' })

    expect(snack).toHaveLength(10)
  })

  it('should not be able to get all snack', async () => {
    await expect(() =>
      snackRepository.findById('non-existing-id'),
    ).rejects.toBeInstanceOf(SnackNotFound)
  })
})
