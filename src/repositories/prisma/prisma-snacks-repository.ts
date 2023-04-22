import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { getBestSequence } from '@/utils/getBestSequence'
import { SnackRepository } from '../snacks-repository'

export class PrismaSnacksRepository implements SnackRepository {
  async create(data: Prisma.SnackUncheckedCreateInput) {
    const snack = await prisma.snack.create({
      data,
    })

    return snack
  }

  async edit(data: Prisma.SnackUncheckedUpdateInput) {
    const updateSnack = await prisma.snack.update({
      where: {
        id: String(data.id),
      },
      data: {
        name: data.name,
        description: data.description,
        insideDiet: data.insideDiet,
        updated_at: new Date(),
      },
    })

    return updateSnack
  }

  async delete(snackId: string) {
    await prisma.snack.delete({
      where: {
        id: snackId,
      },
    })
  }

  async findManyByUserId(userId: string) {
    const snacks = await prisma.snack.findMany({
      where: {
        user_id: userId,
      },
    })

    return snacks
  }

  async findById(snackId: string, userId: string) {
    const snacks = await prisma.snack.findFirst({
      where: {
        id: snackId,
        user_id: userId,
      },
    })

    return snacks
  }

  async getUserMetrics(userId: string) {
    const snacks = await prisma.snack.findMany({
      where: {
        user_id: userId,
      },
    })

    const metrics = {
      total: snacks.length,
      snackOnTheDiet: snacks.filter((item) => item.insideDiet).length,
      snackOffTheDiet: snacks.filter((item) => !item.insideDiet).length,
      bestSequence: getBestSequence(snacks),
    }

    return metrics
  }
}
