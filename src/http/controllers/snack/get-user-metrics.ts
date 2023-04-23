import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUserMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricsParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = getUserMetricsParamsSchema.parse(request.params)

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { metrics } = await getUserMetricsUseCase.execute({
    userId,
  })

  return reply.status(200).send({ metrics })
}
