import { makeDeleteSnackUseCase } from '@/use-cases/factories/make-delete-snack-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteSnack(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteSnackBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteSnackBodySchema.parse(request.body)

  const deleteUseCase = makeDeleteSnackUseCase()

  await deleteUseCase.execute({ snackId: id })

  return reply.status(200).send()
}
