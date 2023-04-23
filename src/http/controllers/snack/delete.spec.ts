import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Delete snacks (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a snack', async () => {
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
      .delete('/snacks/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: snack.id,
      })

    expect(response.statusCode).toEqual(200)
  })
})
