// useShow(id): טוען סדרה אחת ב-useEffect עם [id] ומחזיר { show, isLoading, error }
import { useEffect, useState } from 'react'
import { fetchShow } from '../api/tvmaze'
import type { Show } from '../types/show'

interface ShowResult {
  id: number
  show: Show | null
  error: string | null
}

export const useShow = (id: number) => {
  const [result, setResult] = useState<ShowResult | null>(null)

  const isValidId = Number.isInteger(id)

  useEffect(() => {
    if (!isValidId) {
      return
    }

    let isCancelled = false

    fetchShow(id)
      .then((show) => {
        if (!isCancelled) {
          setResult({ id, show, error: null })
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setResult({
            id,
            show: null,
            error: 'Could not load this show. Check your connection and try again.',
          })
        }
      })

    return () => {
      isCancelled = true
    }
  }, [id, isValidId])

  if (!isValidId) {
    return { show: null, isLoading: false, error: null }
  }

  // כל עוד אין תוצאה בשביל ה-id שבכתובת, עדיין טוענים
  if (result === null || result.id !== id) {
    return { show: null, isLoading: true, error: null }
  }

  return { show: result.show, isLoading: false, error: result.error }
}