// useShows(): טוען את כל הסדרות ב-useEffect ומחזיר { shows, isLoading, error }
import { useEffect, useState } from 'react'
import { fetchShows } from '../api/tvmaze'
import type { Show } from '../types/show'

export const useShows = () => {
  const [shows, setShows] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // אם הרכיב יורד מהמסך לפני שהתשובה מגיעה, מתעלמים מהתשובה
    let isCancelled = false

    fetchShows()
      .then((data) => {
        if (!isCancelled) {
          setShows(data)
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError('Could not load shows. Check your connection and try again.')
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false)
        }
      })

    // cleanup: רץ כשהרכיב יורד מהמסך
    return () => {
      isCancelled = true
    }
  }, [])

  return { shows, isLoading, error }
}