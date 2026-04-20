export type Difficulty = 'easy' | 'medium' | 'hard'

export type QuestionSource = 'past-paper' | 'template'

export type BaseQuestion = {
  id: string
  chapterId: string
  difficulty: Difficulty
  concepts: string[]
  source: QuestionSource
  origin?: string
  prompt: string
}

export type MCQQuestion = BaseQuestion & {
  format: 'mcq'
  options: string[]
  answerIndex: number
  explanation?: string
}

export type TypedQuestion = BaseQuestion & {
  format: 'typed'
  inputKind: 'number' | 'fraction' | 'vector' | 'matrix' | 'expression'
  verify: (input: string) => boolean
  canonicalAnswer: string
  explanation?: string
}

export type Question = MCQQuestion | TypedQuestion
export type QuestionFactory = () => Question
export type BankItem = Question | QuestionFactory

export function isFactory(item: BankItem): item is QuestionFactory {
  return typeof item === 'function'
}
