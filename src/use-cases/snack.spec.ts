import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySnackRepository } from '@/repositories/in-memory/in-memory-snack-repository'

import { SnackNotFound } from './errors/snack-not-found'
import { UseNotAuthorizedEdit } from './errors/user-not-authorized-edit'

import { SnackUseCase } from './snack'

let snackRepository: InMemorySnackRepository
let sut: SnackUseCase

describe('Snack be able to check in', async () => {
  beforeEach(() => {
    snackRepository = new InMemorySnackRepository()
    sut = new SnackUseCase(snackRepository)
  })

  it('should be able to register snack', async () => {
    const { snack } = await sut.createSnack({
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      insideDiet: true,
      userId: 'user-01',
    })

    expect(snack.id).toEqual(expect.any(String))
  })

  it('should be able to edit snack', async () => {
    const { snack: createdSnack } = await sut.createSnack({
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      insideDiet: true,
      userId: 'user-01',
    })

    const { snack: updatedSnack } = await sut.updateSnack({
      id: createdSnack.id,
      name: 'Pizza',
      description: 'Pizza de queijo',
      insideDiet: false,
      userId: 'user-01',
    })

    expect(updatedSnack.id).toEqual(createdSnack.id)

    expect(updatedSnack.name).toEqual('Pizza')
    expect(updatedSnack.description).toEqual('Pizza de queijo')
    expect(updatedSnack.insideDiet).toEqual(false)
    expect(updatedSnack.updated_at).toEqual(expect.any(Date))
  })

  it('should not be able to edit snack with user_id wrong', async () => {
    const { snack: createdSnack } = await sut.createSnack({
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      insideDiet: true,
      userId: 'user-01',
    })

    await expect(() =>
      sut.updateSnack({
        id: createdSnack.id,
        userId: 'user-02',
        name: 'Pizza',
        description: 'Quatro queijo',
        insideDiet: false,
      }),
    ).rejects.toBeInstanceOf(UseNotAuthorizedEdit)
  })

  it('should not be able to edit snack with id wrong', async () => {
    await sut.createSnack({
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      insideDiet: true,
      userId: 'user-01',
    })

    await expect(() =>
      sut.updateSnack({
        id: 'id-not-exist',
        userId: 'user-01',
        name: 'Pizza',
        description: 'Quatro queijo',
        insideDiet: false,
      }),
    ).rejects.toBeInstanceOf(SnackNotFound)
  })
})
