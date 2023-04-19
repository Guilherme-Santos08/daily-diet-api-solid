import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function Create(request: FastifyRequest, reply: FastifyReply) {
  // Create schema zod
  const createSnackBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    insideDiet: z.string(),
  })

  // parse zod
  const { name, description, insideDiet } = createSnackBodySchema.parse(
    request.body,
  )
}
