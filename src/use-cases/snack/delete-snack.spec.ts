import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySnackRepository } from '@/repositories/in-memory/in-memory-snack-repository'
import { SnackDeleteUseCase } from './delete-snack'
import { SnackNotFound } from '../errors/snack-not-found'

let snackRepository: InMemorySnackRepository
let sut: SnackDeleteUseCase

describe('Snack be able to delete snack', async () => {
  beforeEach(() => {
    snackRepository = new InMemorySnackRepository()
    sut = new SnackDeleteUseCase(snackRepository)
  })

  it('should be able to delete snack', async () => {
    const createdSnack = await snackRepository.create({
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      insideDiet: true,
      user_id: 'user-01',
    })

    await sut.execute({ snackId: createdSnack.id })

    await expect(() =>
      snackRepository.findById(createdSnack.id),
    ).rejects.toBeInstanceOf(SnackNotFound)
  })
})
