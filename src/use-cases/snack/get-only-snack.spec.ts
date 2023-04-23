import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySnackRepository } from '@/repositories/in-memory/in-memory-snack-repository'
import { SnackNotFound } from '../errors/snack-not-found'
import { SnackGetOnlyUseCase } from './get-only-snack'
import { UseNotAuthorized } from '../errors/user-not-authorized-edit'

let snackRepository: InMemorySnackRepository
let sut: SnackGetOnlyUseCase

describe('User be able to get only snacks', async () => {
  beforeEach(() => {
    snackRepository = new InMemorySnackRepository()
    sut = new SnackGetOnlyUseCase(snackRepository)
  })

  it('should be able to get only snack', async () => {
    const createdSnack = await snackRepository.create({
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      insideDiet: true,
      user_id: 'user-01',
    })

    const { snack } = await sut.execute({
      snackId: createdSnack.id,
      userId: 'user-01',
    })

    expect(createdSnack.id).toEqual(snack?.id)
  })

  it('should not be able to get all snack', async () => {
    await expect(() =>
      snackRepository.findById('non-existing-id', 'non-existing-userId'),
    ).rejects.toBeInstanceOf(SnackNotFound)
  })

  it('should throw an error if the user is not authorized', async () => {
    const createdSnack = await snackRepository.create({
      id: 'snack-01',
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      created_at: new Date(),
      insideDiet: false,
      user_id: 'user-01',
    })

    await expect(
      sut.execute({ snackId: createdSnack.id, userId: 'user-02' }),
    ).rejects.toThrow(UseNotAuthorized)
  })
})
