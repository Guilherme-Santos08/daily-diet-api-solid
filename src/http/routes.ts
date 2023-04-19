import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/user/authenticate'
import { register } from './controllers/user/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/session', authenticate)
}
