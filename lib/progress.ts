'use client'

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'ma1522:progress:v1'
const PROGRESS_EVENT = 'ma1522:progress'

type ProgressState = Record<string, Record<string, boolean>>

function readState(): ProgressState {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) || {}
  } catch {
    return {}
  }
}

function writeState(s: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // ignore
  }
}

function dispatchProgress() {
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT))
}

let _snapshot: ProgressState = {}

function subscribe(callback: () => void) {
  const handler = () => {
    _snapshot = readState()
    callback()
  }
  window.addEventListener(PROGRESS_EVENT, handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener(PROGRESS_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

function getSnapshot(): ProgressState {
  return _snapshot
}

function getServerSnapshot(): ProgressState {
  return {}
}

export function useProgress() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const isDone = useCallback(
    (chapterId: string, sectionId: string) => {
      return !!(state[chapterId] && state[chapterId][sectionId])
    },
    [state],
  )

  const toggle = useCallback((chapterId: string, sectionId: string) => {
    const s = readState()
    if (!s[chapterId]) s[chapterId] = {}
    if (s[chapterId][sectionId]) {
      delete s[chapterId][sectionId]
    } else {
      s[chapterId][sectionId] = true
    }
    writeState(s)
    _snapshot = s
    dispatchProgress()
  }, [])

  const chapterStats = useCallback(
    (chapterId: string, totalSections: number) => {
      const done = state[chapterId] ? Object.keys(state[chapterId]).length : 0
      return {
        done,
        total: totalSections,
        pct: totalSections ? Math.round((done / totalSections) * 100) : 0,
      }
    },
    [state],
  )

  const overallStats = useCallback(
    (chapters: { id: string; sections: number }[]) => {
      const total = chapters.reduce((a, c) => a + c.sections, 0)
      const done = chapters.reduce((a, c) => {
        return a + (state[c.id] ? Object.keys(state[c.id]).length : 0)
      }, 0)
      return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
    },
    [state],
  )

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    _snapshot = {}
    dispatchProgress()
  }, [])

  return { isDone, toggle, chapterStats, overallStats, reset }
}
