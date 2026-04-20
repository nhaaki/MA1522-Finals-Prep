import { BankItem, Question, isFactory } from './types'
import { shuffle } from './verify'
import { CH1 } from './bank/ch1'
import { CH2 } from './bank/ch2'
import { CH3 } from './bank/ch3'
import { CH4 } from './bank/ch4'
import { CH5 } from './bank/ch5'
import { CH6 } from './bank/ch6'
import { CH7 } from './bank/ch7'

const BANKS: Record<string, BankItem[]> = {
  ch1: CH1,
  ch2: CH2,
  ch3: CH3,
  ch4: CH4,
  ch5: CH5,
  ch6: CH6,
  ch7: CH7,
}

export function getQuestions(
  chapterId: string,
  n = 3,
  difficulty?: 'easy' | 'medium' | 'hard'
): Question[] {
  const bank = BANKS[chapterId] ?? []
  if (bank.length === 0) return []
  // Resolve factories first so we can filter by difficulty
  const resolved: Question[] = shuffle(bank).map((item) => (isFactory(item) ? item() : item))
  const filtered = difficulty ? resolved.filter((q) => q.difficulty === difficulty) : resolved
  const pool = filtered.length > 0 ? filtered : resolved
  return pool.slice(0, Math.min(n, pool.length))
}

export function bankSize(chapterId: string): number {
  return (BANKS[chapterId] ?? []).length
}
