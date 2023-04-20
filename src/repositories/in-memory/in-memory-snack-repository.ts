import { randomUUID } from 'node:crypto'
import { Prisma, Snack } from '@prisma/client'

import { SnackNotFound } from '@/use-cases/errors/snack-not-found'
import { UseNotAuthorizedEdit } from '@/use-cases/errors/user-not-authorized-edit'

import { SnackRepository } from '../snacks-repository'

export class InMemorySnackRepository implements SnackRepository {
  public items: Snack[] = []

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

  async edit(data: Prisma.SnackUncheckedUpdateInput) {
    const snackIndex = this.items.findIndex((snack) => snack.id === data.id)

    if (snackIndex === -1) {
      throw new SnackNotFound()
    }

    if (this.items[snackIndex].user_id !== data.user_id) {
      throw new UseNotAuthorizedEdit()
    }

    const updatedSnack = {
      ...this.items[snackIndex],
      name: String(data.name) ?? this.items[snackIndex].name,
      description:
        String(data.description) ?? this.items[snackIndex].description,
      insideDiet: Boolean(data.insideDiet) ?? this.items[snackIndex].insideDiet,
      updated_at: new Date(),
    }

    this.items[snackIndex] = updatedSnack

    return updatedSnack
  }
}
