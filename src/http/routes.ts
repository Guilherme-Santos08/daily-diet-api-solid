import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/user/authenticate'
import { profile } from './controllers/user/profile'
import { register } from './controllers/user/register'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  /* Authenticated */

  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
