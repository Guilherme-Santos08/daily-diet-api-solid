import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Get all snacks (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all snack', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    await request(app.server)
      .post('/snacks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chocolate',
        description: 'Chocolate da cacau show',
        insideDiet: false,
      })

    await request(app.server)
      .post('/snacks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Salada',
        description: 'Salada com tomate e temperos',
        insideDiet: true,
      })

    const response = await request(app.server)
      .get(`/snacks/get-all-user-snack/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
