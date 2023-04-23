import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { edit } from './edit'
import { deleteSnack } from './delete'
import { getAllUserSnack } from './get-all-user-snack'
import { getUserMetrics } from './get-user-metrics'

export async function snacksRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/snacks', create)
  app.put('/snacks/edit', edit)
  app.delete('/snacks/delete', deleteSnack)

  app.get('/snacks/get-all-user-snack', getAllUserSnack)
  app.get('/snacks/get-user-metrics', getUserMetrics)
}
