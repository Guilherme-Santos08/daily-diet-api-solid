import { randomUUID } from 'node:crypto'
import { Prisma, Snack } from '@prisma/client'

import { SnackNotFound } from '@/use-cases/errors/snack-not-found'
import { UseNotAuthorized } from '@/use-cases/errors/user-not-authorized-edit'

import { SnackRepository } from '../snacks-repository'

// getBestSequence foi tirada do chat-gpt
function getBestSequence(snacks: Snack[]) {
  let maxSequence = 0
  let currentSequence = 0
  let previousDate: Date | null = null

  for (let i = 0; i < snacks.length; i++) {
    const snack = snacks[i]

    // Se a data mudou, atualiza a sequência atual
    if (
      !previousDate ||
      snack.created_at.getDate() !== previousDate.getDate()
    ) {
      maxSequence = Math.max(maxSequence, currentSequence)
      currentSequence = 0
      previousDate = snack.created_at
    }

    // Se a refeição está dentro da dieta, incrementa a sequência atual
    if (snack.insideDiet) {
      currentSequence++
    } else {
      currentSequence = 0
    }
  }

  // Verifica a última sequência
  maxSequence = Math.max(maxSequence, currentSequence)

  return maxSequence
}

export class InMemorySnackRepository implements SnackRepository {
  public items: Snack[] = []

  async findById(snackId: string, userId: string) {
    const snack = this.items.find((item) => item.id === snackId)

    if (!snack) {
      throw new SnackNotFound()
    }

    if (snack.user_id !== userId) {
      throw new UseNotAuthorized()
    }

    return snack
  }

  async findManyByUserId(userId: string) {
    const snackMany = this.items.filter((item) => item.user_id === userId)

    if (snackMany.length === 0) {
      throw new SnackNotFound()
    }

    return snackMany
  }

  async getUserMetrics(userId: string) {
    const snacks = this.items.filter((item) => item.user_id === userId)

    if (snacks.length === 0) {
      throw new SnackNotFound()
    }

    const metrics = {
      total: snacks.length,
      snackOnTheDiet: snacks.filter((item) => item.insideDiet).length,
      snackOffTheDiet: snacks.filter((item) => !item.insideDiet).length,
      bestSequence: getBestSequence(snacks),
    }

    return metrics
  }

  async create(data: Prisma.SnackUncheckedCreateInput) {
    const snack = {
      id: randomUUID(),
      user_id: data.user_id,
      name: data.name,
      description: data.description,
      insideDiet: data.insideDiet,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(snack)

    return snack
  }

  async edit(data: Snack) {
    const snack = this.items.find((snack) => snack.id === data.id)

    if (!snack) {
      throw new SnackNotFound()
    }

    if (snack?.user_id !== data.user_id) {
      throw new UseNotAuthorized()
    }

    const updatedSnack = {
      ...snack,
      name: data.name ?? snack.name,
      description: data.description ?? snack.description,
      insideDiet: data.insideDiet ?? snack.insideDiet,
      updated_at: new Date(),
    }

    const snackIndex = this.items.findIndex((snack) => snack.id === data.id)

    this.items[snackIndex] = updatedSnack

    return updatedSnack
  }

  async delete(snackId: string) {
    this.items = this.items.filter((snack) => snack.id !== snackId)
  }
}
