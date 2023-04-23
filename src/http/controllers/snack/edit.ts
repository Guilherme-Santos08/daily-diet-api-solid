import { makeEditSnackUseCase } from '@/use-cases/factories/make-edit-snack-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editSnackParamsSchema = z.object({
    snackId: z.string().uuid(),
  })

  const editSnackBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    insideDiet: z.boolean(),
  })

  const { snackId } = editSnackParamsSchema.parse(request.params)
  const { name, description, insideDiet } = editSnackBodySchema.parse(
    request.body,
  )

  const editSnackUseCase = makeEditSnackUseCase()

  const { snack } = await editSnackUseCase.execute({
    id: snackId,
    name,
    description,
    insideDiet,
    user_id: request.user.sub,
  })

  return reply.status(200).send({ snack })
}
