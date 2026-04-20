import { BankItem } from '../types'
import { randInt, randNonZero, numberEquals, vectorEquals } from '../verify'

export const CH1: BankItem[] = [
  () => {
    let attempts = 0
    while (attempts < 10) {
      const a = randNonZero(-3, 3)
      const b = randInt(-3, 3)
      const c = randInt(-3, 3)
      const d = randNonZero(-3, 3)
      const det = a * d - b * c
      if (det !== 0) {
        const x = randInt(-4, 4)
        const y = randInt(-4, 4)
        const e = a * x + b * y
        const f = c * x + d * y
        return {
          id: `ch1-tmpl-2x2-${Math.random()}`,
          chapterId: 'ch1',
          difficulty: 'easy',
          concepts: ['s1-2', 's1-4'],
          source: 'template',
          format: 'typed',
          inputKind: 'vector',
          prompt: `Solve: $${a}x + ${b}y = ${e}$, $${c}x + ${d}y = ${f}$. Enter as $(x, y)$.`,
          verify: (s) => vectorEquals(s, [x, y]),
          canonicalAnswer: `(${x}, ${y})`,
          explanation: 'Use Gaussian elimination.',
        }
      }
      attempts++
    }
    // fallback canonical
    return {
      id: 'ch1-tmpl-2x2-fallback',
      chapterId: 'ch1',
      difficulty: 'easy',
      concepts: ['s1-2', 's1-4'],
      source: 'template',
      format: 'typed',
      inputKind: 'vector',
      prompt: `Solve: $x + 2y = 5$, $3x - y = 4$. Enter as $(x, y)$.`,
      verify: (s) => vectorEquals(s, [1, 2]),
      canonicalAnswer: '(1, 2)',
    }
  },
  () => {
    let attempts = 0
    while (attempts < 10) {
      const a = randNonZero(-3, 3)
      const b = randInt(-3, 3)
      const c = randInt(-3, 3)
      const d = randNonZero(-3, 3)
      const det = a * d - b * c
      if (det !== 0) {
        const x = randInt(-4, 4)
        const y = randInt(-4, 4)
        const e = a * x + b * y
        const f = c * x + d * y
        return {
          id: `ch1-tmpl-2x2-v2-${Math.random()}`,
          chapterId: 'ch1',
          difficulty: 'medium',
          concepts: ['s1-2', 's1-4'],
          source: 'template',
          format: 'typed',
          inputKind: 'vector',
          prompt: `Solve: $${a}x + ${b}y = ${e}$, $${c}x + ${d}y = ${f}$. Answer as $(x, y)$.`,
          verify: (s) => vectorEquals(s, [x, y]),
          canonicalAnswer: `(${x}, ${y})`,
        }
      }
      attempts++
    }
    return {
      id: 'ch1-tmpl-2x2-v2-fallback',
      chapterId: 'ch1',
      difficulty: 'medium',
      concepts: ['s1-2', 's1-4'],
      source: 'template',
      format: 'typed',
      inputKind: 'vector',
      prompt: `Solve: $2x - y = 3$, $x + 2y = 4$. Answer as $(x, y)$.`,
      verify: (s) => vectorEquals(s, [2, 1]),
      canonicalAnswer: '(2, 1)',
    }
  },
  () => {
    let attempts = 0
    while (attempts < 10) {
      const a = randNonZero(-3, 3)
      const b = randInt(-3, 3)
      const c = randInt(-3, 3)
      const d = randNonZero(-3, 3)
      const det = a * d - b * c
      if (det !== 0) {
        const x = randInt(-4, 4)
        const y = randInt(-4, 4)
        const e = a * x + b * y
        const f = c * x + d * y
        return {
          id: `ch1-tmpl-2x2-v3-${Math.random()}`,
          chapterId: 'ch1',
          difficulty: 'hard',
          concepts: ['s1-2', 's1-4'],
          source: 'template',
          format: 'typed',
          inputKind: 'vector',
          prompt: `Solve the system: $${a}x + ${b}y = ${e}$, $${c}x + ${d}y = ${f}$. Enter $(x, y)$.`,
          verify: (s) => vectorEquals(s, [x, y]),
          canonicalAnswer: `(${x}, ${y})`,
        }
      }
      attempts++
    }
    return {
      id: 'ch1-tmpl-2x2-v3-fallback',
      chapterId: 'ch1',
      difficulty: 'hard',
      concepts: ['s1-2', 's1-4'],
      source: 'template',
      format: 'typed',
      inputKind: 'vector',
      prompt: `Solve: $3x + y = 5$, $x - 2y = -4$. Enter $(x, y)$.`,
      verify: (s) => vectorEquals(s, [1, 2]),
      canonicalAnswer: '(1, 2)',
    }
  },
  {
    id: 'ch1-mcq-ref-1',
    chapterId: 'ch1',
    difficulty: 'easy',
    concepts: ['s1-2'],
    source: 'template',
    format: 'mcq',
    prompt: `Which matrix is in row-echelon form (REF)?`,
    options: [
      `$\\begin{bmatrix}1 & 2 & 3\\\\0 & 0 & 4\\\\0 & 1 & 2\\end{bmatrix}$`,
      `$\\begin{bmatrix}1 & 2 & 3\\\\0 & 1 & 2\\\\0 & 0 & 4\\end{bmatrix}$`,
      `$\\begin{bmatrix}0 & 1 & 2\\\\1 & 0 & 3\\\\0 & 0 & 4\\end{bmatrix}$`,
      `$\\begin{bmatrix}1 & 2 & 3\\\\0 & 1 & 2\\\\0 & 2 & 4\\end{bmatrix}$`,
    ],
    answerIndex: 1,
    explanation: 'REF requires pivots to move right; zero rows at the bottom.',
  },
  {
    id: 'ch1-mcq-consistency-1',
    chapterId: 'ch1',
    difficulty: 'medium',
    concepts: ['s1-5'],
    source: 'template',
    format: 'mcq',
    prompt: `The augmented REF is $\\begin{bmatrix}1 & 2 & 0 & | & 3\\\\0 & 0 & 1 & | & -1\\\\0 & 0 & 0 & | & 0\\end{bmatrix}$. How many solutions?`,
    options: ['No solution', 'Exactly one', 'Infinitely many (1 free)', 'Infinitely many (2 free)'],
    answerIndex: 2,
    explanation: 'One free variable (column 2); consistent system.',
  },
  {
    id: 'ch1-mcq-inconsistent-1',
    chapterId: 'ch1',
    difficulty: 'hard',
    concepts: ['s1-5'],
    source: 'template',
    format: 'mcq',
    prompt: `The augmented REF has a row $[0 \\; 0 \\; 0 \\; | \\; 5]$. What does this mean?`,
    options: ['Infinitely many solutions', 'No solution', 'Unique solution', 'Dependent rows'],
    answerIndex: 1,
    explanation: 'Row $0 = 5$ is a contradiction, so the system is inconsistent.',
  },
  () => {
    const rank = randInt(1, 3)
    const cols = rank + randInt(1, 2)
    return {
      id: `ch1-tmpl-free-${Math.random()}`,
      chapterId: 'ch1',
      difficulty: 'easy',
      concepts: ['s1-5'],
      source: 'template',
      format: 'typed',
      inputKind: 'number',
      prompt: `A consistent system in ${cols} variables has rank ${rank}. How many free variables?`,
      verify: (s) => numberEquals(s, cols - rank),
      canonicalAnswer: String(cols - rank),
      explanation: `Free = ${cols} − ${rank} = ${cols - rank}.`,
    }
  },
  {
    id: 'ch1-mcq-gje-1',
    chapterId: 'ch1',
    difficulty: 'medium',
    concepts: ['s1-4'],
    source: 'template',
    format: 'mcq',
    prompt: `Gauss-Jordan elimination reduces a matrix to which form?`,
    options: ['REF', 'RREF', 'Triangular', 'Echelon only'],
    answerIndex: 1,
    explanation: 'Gauss-Jordan produces Reduced Row Echelon Form (RREF).',
  },
]
