import { makeGetOnlySnackUseCase } from '@/use-cases/factories/make-get-only-snack-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOnlySnack(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOnlySnackParamsSchema = z.object({
    snackId: z.string().uuid(),
  })

  const { snackId } = getOnlySnackParamsSchema.parse(request.params)

  const getOnlySnackUseCase = makeGetOnlySnackUseCase()

  const { snack } = await getOnlySnackUseCase.execute({
    snackId,
  })

  return reply.status(200).send({ snack })
}
