import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Edit snacks (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to edit a snack', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const snack = await prisma.snack.create({
      data: {
        name: 'Macarrão',
        description: 'Macarrão com molho vermelho',
        insideDiet: false,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .put(`/snacks/edit/${snack.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Salgadinho',
        description: 'doritos',
        insideDiet: true,
      })

    expect(response.statusCode).toEqual(200)
  })
})
