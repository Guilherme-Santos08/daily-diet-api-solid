import { InMemorySnackRepository } from '@/repositories/in-memory/in-memory-snack-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SnackEditUseCase } from './edit-snack'

let snackRepository: InMemorySnackRepository
let sut: SnackEditUseCase

describe('User be able edit snack', async () => {
  beforeEach(() => {
    snackRepository = new InMemorySnackRepository()
    sut = new SnackEditUseCase(snackRepository)
  })

  it('should be able to edit snack', async () => {
    const createdSnack = await snackRepository.create({
      id: 'snack-01',
      name: 'Macarrão',
      description: 'Macarrão ao melho bombole',
      created_at: new Date(),
      insideDiet: false,
      user_id: 'user-01',
    })

    const { snack: updatedSnack } = await sut.execute({
      id: createdSnack.id,
      name: 'Pizza',
      description: 'Pizza de queijo',
      insideDiet: false,
      user_id: 'user-01',
    })

    expect(updatedSnack.id).toEqual(createdSnack.id)

    expect(updatedSnack.name).toEqual('Pizza')
    expect(updatedSnack.description).toEqual('Pizza de queijo')
    expect(updatedSnack.insideDiet).toEqual(false)
    expect(updatedSnack.updated_at).toEqual(expect.any(Date))
  })
})
