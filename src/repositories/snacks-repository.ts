import { Prisma, Snack } from '@prisma/client'

export interface SnackRepository {
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>
  edit(data: Prisma.SnackUncheckedUpdateInput): Promise<Snack>
  delete(snackId: string): Promise<void>
  findManyByUserId(userId: string): Promise<Snack[]>
  findById(snackId: string, userId: string): Promise<Snack | null>
  getUserMetrics(userId: string): Promise<any>
}
