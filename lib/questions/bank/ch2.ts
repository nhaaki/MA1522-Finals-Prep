import { BankItem } from '../types'
import { randInt, randNonZero, numberEquals, matrixEquals } from '../verify'

export const CH2: BankItem[] = [
  () => {
    const a = randInt(-4, 4)
    const b = randInt(-4, 4)
    const c = randInt(-4, 4)
    const d = randInt(-4, 4)
    const det = a * d - b * c
    return {
      id: `ch2-tmpl-det2-${Math.random()}`,
      chapterId: 'ch2',
      difficulty: 'easy',
      concepts: ['s2-8', 's2-10'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `Compute $\\det\\begin{bmatrix}${a} & ${b}\\\\${c} & ${d}\\end{bmatrix}$.`,
      verify: (s) => numberEquals(s, det),
      canonicalAnswer: String(det),
      explanation: `$ad - bc = (${a})(${d}) - (${b})(${c}) = ${det}$.`,
    }
  },
  () => {
    const a = randInt(-4, 4)
    const b = randInt(-4, 4)
    const c = randInt(-4, 4)
    const d = randInt(-4, 4)
    const det = a * d - b * c
    return {
      id: `ch2-tmpl-det2-v2-${Math.random()}`,
      chapterId: 'ch2',
      difficulty: 'medium',
      concepts: ['s2-8', 's2-10'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `Find $\\det\\begin{bmatrix}${a} & ${b}\\\\${c} & ${d}\\end{bmatrix}$.`,
      verify: (s) => numberEquals(s, det),
      canonicalAnswer: String(det),
    }
  },
  () => {
    const a = randNonZero(-3, 3)
    const b = randNonZero(-3, 3)
    const c = randNonZero(-3, 3)
    return {
      id: `ch2-tmpl-tri-${Math.random()}`,
      chapterId: 'ch2',
      difficulty: 'easy',
      concepts: ['s2-8', 's2-10'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `$\\det\\begin{bmatrix}${a} & 3 & 7\\\\0 & ${b} & -2\\\\0 & 0 & ${c}\\end{bmatrix} = ?$`,
      verify: (s) => numberEquals(s, a * b * c),
      canonicalAnswer: String(a * b * c),
      explanation: 'Triangular matrix: determinant = product of diagonal.',
    }
  },
  () => {
    const a = randNonZero(-3, 3)
    const b = randNonZero(-3, 3)
    const c = randNonZero(-3, 3)
    return {
      id: `ch2-tmpl-tri-v2-${Math.random()}`,
      chapterId: 'ch2',
      difficulty: 'hard',
      concepts: ['s2-8', 's2-10'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `$\\det\\begin{bmatrix}${a} & 2 & -1\\\\0 & ${b} & 4\\\\0 & 0 & ${c}\\end{bmatrix} = ?$`,
      verify: (s) => numberEquals(s, a * b * c),
      canonicalAnswer: String(a * b * c),
    }
  },
  {
    id: 'ch2-mcq-invertible-1',
    chapterId: 'ch2',
    difficulty: 'medium',
    concepts: ['s2-6'],
    source: 'template',
    format: 'mcq',
    prompt: `Which does **NOT** imply $A$ is invertible?`,
    options: [
      '$\\det(A) \\neq 0$',
      '$A$ row-equivalent to $I$',
      'Only trivial solution to $Ax=0$',
      '$A$ is $3\\times 2$ and columns span $\\mathbb{R}^3$',
    ],
    answerIndex: 3,
    explanation: 'A $3\\times 2$ matrix cannot be square, so not invertible.',
  },
  {
    id: 'ch2-mcq-singular-1',
    chapterId: 'ch2',
    difficulty: 'easy',
    concepts: ['s2-6'],
    source: 'template',
    format: 'mcq',
    prompt: `$A$ is singular (not invertible) if and only if`,
    options: ['$\\det(A) = 0$', '$\\det(A) \\neq 0$', '$A$ is $n\\times n$', 'Rows are independent'],
    answerIndex: 0,
    explanation: 'Singular = $\\det(A) = 0$.',
  },
  {
    id: 'ch2-mcq-lu-1',
    chapterId: 'ch2',
    difficulty: 'hard',
    concepts: ['s2-7'],
    source: 'template',
    format: 'mcq',
    prompt: `An LU factorization of $A$ requires`,
    options: ['$A$ square', 'No row swaps in Gaussian elimination', 'All pivots nonzero', 'All of the above'],
    answerIndex: 3,
    explanation: 'LU exists iff no row swaps are needed, which happens iff all leading minors are nonzero.',
  },
  () => {
    const a = randInt(1, 5)
    const b = randInt(1, 5)
    return {
      id: `ch2-tmpl-det-scale-${Math.random()}`,
      chapterId: 'ch2',
      difficulty: 'medium',
      concepts: ['s2-10'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `If $\\det(A) = ${a}$ and $\\det(B) = ${b}$, then $\\det(AB) = ?$`,
      verify: (s) => numberEquals(s, a * b),
      canonicalAnswer: String(a * b),
      explanation: '$\\det(AB) = \\det(A)\\det(B)$.',
    }
  },
]
