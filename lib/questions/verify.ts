export function normalize(s: string): string {
  return s.trim().replace(/[−–—]/g, '-').replace(/\s+/g, '')
}

export function parseNumber(s: string): number | null {
  const n = normalize(s)
  if (n === '') return null
  const frac = n.match(/^(-?\d+)\/(-?\d+)$/)
  if (frac) {
    const den = Number(frac[2])
    if (den === 0) return null
    return Number(frac[1]) / den
  }
  const num = Number(n)
  return Number.isFinite(num) ? num : null
}

export function approxEqual(a: number, b: number, tol = 1e-6): boolean {
  return Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b))
}

export function numberEquals(input: string, target: number, tol = 1e-6): boolean {
  const v = parseNumber(input)
  return v !== null && approxEqual(v, target, tol)
}

function stripBrackets(s: string): string {
  return s.replace(/^[\(\[\{]|[\)\]\}]$/g, '')
}

export function parseVector(s: string): number[] | null {
  const cleaned = stripBrackets(normalize(s))
  if (cleaned === '') return null
  const parts = cleaned.split(',')
  const nums: number[] = []
  for (const p of parts) {
    const v = parseNumber(p)
    if (v === null) return null
    nums.push(v)
  }
  return nums
}

export function vectorEquals(input: string, target: number[], tol = 1e-6): boolean {
  const v = parseVector(input)
  if (!v || v.length !== target.length) return false
  return v.every((x, i) => approxEqual(x, target[i], tol))
}

// Vectors equal up to nonzero scalar multiple (useful for eigenvectors / null space).
export function vectorEqualsUpToScale(input: string, target: number[], tol = 1e-6): boolean {
  const v = parseVector(input)
  if (!v || v.length !== target.length) return false
  let k: number | null = null
  for (let i = 0; i < v.length; i++) {
    if (Math.abs(target[i]) < tol && Math.abs(v[i]) < tol) continue
    if (Math.abs(target[i]) < tol || Math.abs(v[i]) < tol) return false
    const ratio = v[i] / target[i]
    if (k === null) k = ratio
    else if (!approxEqual(ratio, k, tol)) return false
  }
  return k !== null && Math.abs(k) > tol
}

export function parseMatrix(s: string): number[][] | null {
  const raw = normalize(s)
  if (raw === '') return null
  // Support [[1,2],[3,4]] or 1,2;3,4
  const bracketed = raw.match(/^\[\[.+\]\]$/)
  let rowStrings: string[]
  if (bracketed) {
    const inner = raw.slice(1, -1)
    const matches = inner.match(/\[[^\]]*\]/g)
    if (!matches) return null
    rowStrings = matches.map((r) => r.slice(1, -1))
  } else {
    rowStrings = raw.split(';')
  }
  const rows: number[][] = []
  let width = -1
  for (const rs of rowStrings) {
    const parts = rs.split(',')
    const row: number[] = []
    for (const p of parts) {
      const v = parseNumber(p)
      if (v === null) return null
      row.push(v)
    }
    if (width === -1) width = row.length
    else if (row.length !== width) return null
    rows.push(row)
  }
  return rows
}

export function matrixEquals(input: string, target: number[][], tol = 1e-6): boolean {
  const m = parseMatrix(input)
  if (!m || m.length !== target.length) return false
  for (let i = 0; i < m.length; i++) {
    if (m[i].length !== target[i].length) return false
    for (let j = 0; j < m[i].length; j++) {
      if (!approxEqual(m[i][j], target[i][j], tol)) return false
    }
  }
  return true
}

// Set equality (unordered) for answers like eigenvalue lists.
export function numberSetEquals(input: string, target: number[], tol = 1e-6): boolean {
  const v = parseVector(input)
  if (!v || v.length !== target.length) return false
  const sortedV = [...v].sort((a, b) => a - b)
  const sortedT = [...target].sort((a, b) => a - b)
  return sortedV.every((x, i) => approxEqual(x, sortedT[i], tol))
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randNonZero(min: number, max: number): number {
  let v = 0
  while (v === 0) v = randInt(min, max)
  return v
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
