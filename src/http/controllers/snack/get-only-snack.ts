import { makeGetOnlySnackUseCase } from '@/use-cases/factories/make-get-only-snack-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOnlySnack(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOnlySnackBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getOnlySnackBodySchema.parse(request.body)

  const getOnlySnackUseCase = makeGetOnlySnackUseCase()

  const { snack } = await getOnlySnackUseCase.execute({
    snackId: id,
    userId: request.user.sub,
  })

  return reply.status(200).send({ snack })
}
