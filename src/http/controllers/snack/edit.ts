import { makeEditSnackUseCase } from '@/use-cases/factories/make-edit-snack-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editSnackBodySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    insideDiet: z.boolean(),
  })

  const { name, description, insideDiet, id } = editSnackBodySchema.parse(
    request.body,
  )

  const editSnackUseCase = makeEditSnackUseCase()

  const { snack } = await editSnackUseCase.execute({
    id,
    name,
    description,
    insideDiet,
    user_id: request.user.sub,
  })

  return reply.status(200).send({ snack })
}
