import { makeDeleteSnackUseCase } from '@/use-cases/factories/make-delete-snack-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteSnack(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteSnackBodySchema = z.object({
    snackId: z.string().uuid(),
  })

  const { snackId } = deleteSnackBodySchema.parse(request.params)

  const deleteUseCase = makeDeleteSnackUseCase()

  await deleteUseCase.execute({ snackId })

  return reply.status(200).send()
}
