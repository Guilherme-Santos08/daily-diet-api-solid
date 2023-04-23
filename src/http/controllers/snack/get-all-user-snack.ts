import { makeGetAllUserSnackUseCase } from '@/use-cases/factories/make-get-all-user-snack-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUserSnack(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllUserSnackUseCase = makeGetAllUserSnackUseCase()

  const { snack } = await getAllUserSnackUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ snack })
}
