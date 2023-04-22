import { Snack } from '@prisma/client'

// getBestSequence foi tirada do chat-gpt
export function getBestSequence(snacks: Snack[]) {
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
