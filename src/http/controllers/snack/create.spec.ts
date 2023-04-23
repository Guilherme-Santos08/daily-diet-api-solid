import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create snacks (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a snack', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/snacks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'DzScript',
        description: 'Testeee',
        insideDiet: true,
      })

    expect(response.statusCode).toEqual(201)
  })
})
