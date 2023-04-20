import { Prisma, Snack } from '@prisma/client'

export interface SnackRepository {
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>
  edit(data: Prisma.SnackUncheckedUpdateInput): Promise<Snack>
}
