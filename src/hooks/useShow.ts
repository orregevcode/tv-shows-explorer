// useShow(id): a custom hook that loads ONE show, for the details page.
// Like useShows, it returns { show, isLoading, error }.
import { useEffect, useState } from 'react'
import { fetchShow } from '../api/tvmaze'
import type { Show } from '../types/show'

// The result remembers which id it belongs to.
// That is how the hook knows whether the data it has matches the id in the address.
interface ShowResult {
  id: number
  show: Show | null // null = there is no show with this id (404)
  error: string | null // null = no error
}

export const useShow = (id: number) => {
  // One piece of state for the whole result. null = nothing has loaded yet.
  const [result, setResult] = useState<ShowResult | null>(null)

  // For /shows/abc, Number('abc') is NaN, so there is nothing to load.
  // Number.isInteger gives false for NaN (and for numbers like 1.5).
  const isValidId = Number.isInteger(id)

  // Runs after the render, and again every time the id changes (see [id, isValidId] at the bottom).
  useEffect(() => {
    if (!isValidId) {
      return // a bad id: don't fetch at all
    }

    // If the id changes, or the page closes, before the answer arrives, ignore the old answer.
    let isCancelled = false

    fetchShow(id)
      // The request worked: save the show (or null for a 404) together with the id it belongs to.
      .then((show) => {
        if (!isCancelled) {
          setResult({ id, show, error: null })
        }
      })
      // The request failed (no network, or a server error): save an error message.
      .catch(() => {
        if (!isCancelled) {
          setResult({
            id,
            show: null,
            error: 'Could not load this show. Check your connection and try again.',
          })
        }
      })

    // Cleanup: React runs this before the effect runs again with a new id, and when the page closes.
    return () => {
      isCancelled = true
    }
  }, [id, isValidId]) // run again whenever the id in the address changes

  // The lines below run on every render and work out what to return.
  // isLoading is not its own state: it is calculated from result and id.
  // That way the effect never has to call setState at its start (the linter warns about that).

  // A bad id: not loading, no error, no show → the page shows "Show not found".
  if (!isValidId) {
    return { show: null, isLoading: false, error: null }
  }

  // No result yet, or the result belongs to a different id → still loading.
  // (A NaN id must never get here: NaN !== NaN is always true, so it would load forever.
  // That is why isValidId is checked first.)
  if (result === null || result.id !== id) {
    return { show: null, isLoading: true, error: null }
  }

  // The result belongs to this id: give back the show, or the error.
  return { show: result.show, isLoading: false, error: result.error }
}
