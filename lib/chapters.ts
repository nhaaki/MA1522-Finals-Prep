export interface ChapterMeta {
  id: string
  num: number
  slug: string
  title: string
  blurb: string
  sections: number
  toc: { id: string; label: string }[]
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'ch1',
    num: 1,
    slug: '1',
    title: 'Linear Systems',
    blurb:
      'Equations, augmented matrices, row-echelon forms, and Gaussian / Gauss-Jordan elimination.',
    sections: 5,
    toc: [
      { id: 's1-1', label: '1.1 Introduction to Linear Systems' },
      { id: 's1-2', label: '1.2 Solving a Linear System & Row-Echelon Form' },
      { id: 's1-3', label: '1.3 Elementary Row Operations' },
      { id: 's1-4', label: '1.4 Row Reduction: Gaussian & Gauss-Jordan' },
      { id: 's1-5', label: '1.5 More on Linear Systems' },
    ],
  },
  {
    id: 'ch2',
    num: 2,
    slug: '2',
    title: 'Matrices',
    blurb: 'Matrix algebra, inverses, elementary matrices, LU factorization, and determinants.',
    sections: 10,
    toc: [
      { id: 's2-1', label: '2.1 Definition & Special Types' },
      { id: 's2-2', label: '2.2 Matrix Algebra' },
      { id: 's2-3', label: '2.3 Linear System & Matrix Equation' },
      { id: 's2-4', label: '2.4 Inverse of Matrices' },
      { id: 's2-5', label: '2.5 Elementary Matrices' },
      { id: 's2-6', label: '2.6 Equivalent Statements for Invertibility' },
      { id: 's2-7', label: '2.7 LU Factorization' },
      { id: 's2-8', label: '2.8 Determinant by Cofactor Expansion' },
      { id: 's2-9', label: '2.9 Determinant by Reduction' },
      { id: 's2-10', label: '2.10 Properties of Determinant' },
    ],
  },
  {
    id: 'ch3',
    num: 3,
    slug: '3',
    title: 'Vectors & Vector Spaces',
    blurb:
      'Euclidean space, linear combinations, spans, subspaces, independence, bases, and dimension.',
    sections: 8,
    toc: [
      { id: 's3-1', label: '3.1 Euclidean Vector Spaces' },
      { id: 's3-2', label: '3.2 Dot Product, Norm, Distance' },
      { id: 's3-3', label: '3.3 Linear Combinations & Spans' },
      { id: 's3-4', label: '3.4 Subspaces' },
      { id: 's3-5', label: '3.5 Linear Independence' },
      { id: 's3-6', label: '3.6 Basis & Coordinates' },
      { id: 's3-7', label: '3.7 Dimension' },
      { id: 's3-8', label: '3.8 Transition Matrices' },
    ],
  },
  {
    id: 'ch4',
    num: 4,
    slug: '4',
    title: 'Column, Row & Null Spaces',
    blurb:
      'The three fundamental subspaces, rank, rank–nullity, and full-rank characterizations.',
    sections: 2,
    toc: [
      { id: 's4-1', label: '4.1 Column Space, Row Space & Nullspace' },
      { id: 's4-2', label: '4.2 Rank' },
    ],
  },
  {
    id: 'ch5',
    num: 5,
    slug: '5',
    title: 'Orthogonality',
    blurb: 'Dot products, orthogonal bases, projections, Gram-Schmidt, QR and least squares.',
    sections: 5,
    toc: [
      { id: 's5-1', label: '5.1 Orthogonality' },
      { id: 's5-2', label: '5.2 Orthogonal & Orthonormal Bases' },
      { id: 's5-3', label: '5.3 Orthogonal Projection' },
      { id: 's5-4', label: '5.4 QR Factorization' },
      { id: 's5-5', label: '5.5 Least Square Approximation' },
    ],
  },
  {
    id: 'ch6',
    num: 6,
    slug: '6',
    title: 'Eigenvalues & Diagonalization',
    blurb: 'Eigenpairs, diagonalization, the spectral theorem, Markov chains, and SVD.',
    sections: 5,
    toc: [
      { id: 's6-1', label: '6.1 Eigenvalues & Eigenvectors' },
      { id: 's6-2', label: '6.2 Diagonalization' },
      { id: 's6-3', label: '6.3 Orthogonal Diagonalization' },
      { id: 's6-4', label: '6.4 Application: Markov Chains' },
      { id: 's6-5', label: '6.5 Application: SVD' },
    ],
  },
  {
    id: 'ch7',
    num: 7,
    slug: '7',
    title: 'Linear Transformations',
    blurb:
      'Linearity, standard matrices, range, kernel, injectivity, surjectivity, and bijection.',
    sections: 2,
    toc: [
      { id: 's7-1', label: '7.1 Introduction to Linear Transformations' },
      { id: 's7-2', label: '7.2 Range & Kernel' },
    ],
  },
]

export function getChapter(slug: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.slug === slug)
}

export function totalSections(): number {
  return CHAPTERS.reduce((a, c) => a + c.sections, 0)
}
