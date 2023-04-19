import { SnackInsRepository } from '@/repositories/snacks-repository'

import { Prisma, Snack } from '@prisma/client'

import { randomUUID } from 'node:crypto'

export class InMemorySnackRepository implements SnackInsRepository {
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
}
