import { BankItem } from '../types'
import { randInt, randNonZero, numberEquals, vectorEquals } from '../verify'

export const CH3: BankItem[] = [
  () => {
    const u = [randInt(-4, 4), randInt(-4, 4), randInt(-4, 4)]
    const v = [randInt(-4, 4), randInt(-4, 4), randInt(-4, 4)]
    const dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
    return {
      id: `ch3-tmpl-dot-${Math.random()}`,
      chapterId: 'ch3',
      difficulty: 'easy',
      concepts: ['s3-2'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `$u \\cdot v$ where $u = (${u.join(', ')})$ and $v = (${v.join(', ')})$ = ?`,
      verify: (s) => numberEquals(s, dot),
      canonicalAnswer: String(dot),
    }
  },
  () => {
    const u = [randInt(-4, 4), randInt(-4, 4), randInt(-4, 4)]
    const v = [randInt(-4, 4), randInt(-4, 4), randInt(-4, 4)]
    const dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
    return {
      id: `ch3-tmpl-dot-v2-${Math.random()}`,
      chapterId: 'ch3',
      difficulty: 'medium',
      concepts: ['s3-2'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `Compute $(${u.join(', ')}) \\cdot (${v.join(', ')})$.`,
      verify: (s) => numberEquals(s, dot),
      canonicalAnswer: String(dot),
    }
  },
  () => {
    const v = [randNonZero(-4, 4), randNonZero(-4, 4), randInt(-4, 4)]
    const n2 = v[0] ** 2 + v[1] ** 2 + v[2] ** 2
    return {
      id: `ch3-tmpl-norm-${Math.random()}`,
      chapterId: 'ch3',
      difficulty: 'easy',
      concepts: ['s3-2'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `$\\|v\\|^2$ for $v = (${v.join(', ')})$ = ?`,
      verify: (s) => numberEquals(s, n2),
      canonicalAnswer: String(n2),
    }
  },
  () => {
    const v = [randNonZero(-4, 4), randNonZero(-4, 4), randInt(-4, 4)]
    const n2 = v[0] ** 2 + v[1] ** 2 + v[2] ** 2
    return {
      id: `ch3-tmpl-norm-v2-${Math.random()}`,
      chapterId: 'ch3',
      difficulty: 'hard',
      concepts: ['s3-2'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `Find $\\|v\\|^2$ where $v = (${v.join(', ')})$.`,
      verify: (s) => numberEquals(s, n2),
      canonicalAnswer: String(n2),
    }
  },
  {
    id: 'ch3-mcq-subspace-1',
    chapterId: 'ch3',
    difficulty: 'medium',
    concepts: ['s3-4'],
    source: 'template',
    format: 'mcq',
    prompt: `Which is **not** a subspace of $\\mathbb{R}^3$?`,
    options: [
      `$\\{(x, y, z) : x + y + z = 0\\}$`,
      `$\\{(x, y, z) : x + y + z = 1\\}$`,
      `$\\{(x, y, z) : x = y = z\\}$`,
      `$\\{(x, y, z) : z = 0\\}$`,
    ],
    answerIndex: 1,
    explanation: 'Does not contain $\\mathbf{0}$.',
  },
  {
    id: 'ch3-mcq-indep-1',
    chapterId: 'ch3',
    difficulty: 'medium',
    concepts: ['s3-5', 's3-6'],
    source: 'template',
    format: 'mcq',
    prompt: `Which set is linearly **independent**?`,
    options: [
      `$\\{(1, 2, 3), (2, 4, 6)\\}$`,
      `$\\{(1, 0, 0), (0, 1, 0), (1, 1, 0)\\}$`,
      `$\\{(1, 0, 0), (0, 1, 0), (0, 0, 1)\\}$`,
      `$\\{(1, 1, 1), (2, 2, 2)\\}$`,
    ],
    answerIndex: 2,
    explanation: 'Standard basis is linearly independent.',
  },
  {
    id: 'ch3-mcq-span-1',
    chapterId: 'ch3',
    difficulty: 'easy',
    concepts: ['s3-3'],
    source: 'template',
    format: 'mcq',
    prompt: `The span of $\\{(1,0,0), (0,1,0)\\}$ is`,
    options: ['$\\mathbb{R}$', 'The $xy$-plane in $\\mathbb{R}^3$', 'A line', '$\\mathbb{R}^2$'],
    answerIndex: 1,
    explanation: 'All linear combinations form the $xy$-plane.',
  },
  {
    id: 'ch3-mcq-basis-1',
    chapterId: 'ch3',
    difficulty: 'hard',
    concepts: ['s3-6'],
    source: 'template',
    format: 'mcq',
    prompt: `A basis for a vector space must be`,
    options: ['Linearly independent only', 'Spanning only', 'Both independent and spanning', 'Orthogonal'],
    answerIndex: 2,
    explanation: 'A basis is a maximal linearly independent set, hence spans.',
  },
]
