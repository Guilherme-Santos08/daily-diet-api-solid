import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get all user metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to get all metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    for (let index = 0; index < 10; index += 1) {
      await request(app.server)
        .post('/snacks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Chocolate',
          description: 'Chocolate da cacau show',
          insideDiet: false,
        })
    }

    for (let index = 0; index < 10; index += 1) {
      await request(app.server)
        .post('/snacks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Salada',
          description: 'Salada com tomate e temperos',
          insideDiet: true,
        })
    }

    const response = await request(app.server)
      .get('/snacks/get-user-metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
