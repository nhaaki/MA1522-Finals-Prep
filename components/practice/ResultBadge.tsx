'use client'

export default function ResultBadge({ status }: { status: 'correct' | 'incorrect' }) {
  const isCorrect = status === 'correct'
  return (
    <span
      className={`result-badge inline-flex items-center justify-center w-7 h-7 rounded-full ${isCorrect ? 'bg-ok' : 'bg-warn'}`}
      aria-label={isCorrect ? 'Correct' : 'Incorrect'}
    >
      {isCorrect ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline className="tick-path" points="4 12 10 18 20 6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line className="cross-path cross-path-1" x1="6" y1="6" x2="18" y2="18" />
          <line className="cross-path cross-path-2" x1="18" y1="6" x2="6" y2="18" />
        </svg>
      )}
    </span>
  )
}
