// useShows: a custom hook that loads ALL the shows from the TVmaze API.
// It returns 3 values: shows (the data), isLoading (true while waiting) and error (a message, or null).
// App calls it once and passes the result down to the pages as props.

import { useEffect, useState } from 'react'
// fetchShows is exported with `export const` in api/tvmaze.ts, so I can import it here by its name.
// It does the real fetch() call and gives back the shows as JSON.
import { fetchShows } from '../api/tvmaze'
// `import type` brings in only a TypeScript type. It disappears when the app is built.
import type { Show } from '../types/show'

// A custom hook is a normal function whose name starts with "use" and that uses other hooks inside.
export const useShows = () => {
  // 3 pieces of state. When one of them changes, React re-renders the component that called this hook.
  const [shows, setShows] = useState<Show[]>([]) // an empty list until the data arrives
  const [isLoading, setIsLoading] = useState(true) // true at the start, because loading begins right away
  const [error, setError] = useState<string | null>(null) // null means "no error"

  // useEffect runs AFTER the component renders. Fetching data is a "side effect",
  // so it must not run during the render itself. If it did, it would loop forever:
  // fetch → setShows → render → fetch → setShows → ...
  useEffect(() => {
    // If the component leaves the screen before the answer arrives, we must not update its state.
    // The cleanup function at the bottom sets this to true in that case.
    let isCancelled = false

    // fetchShows() returns a Promise: an answer that will arrive later.
    fetchShows()
      // .then runs when the request worked. data is the array of shows, already turned from JSON into objects.
      .then((data) => {
        if (!isCancelled) {
          setShows(data) // update the state with the data → React re-renders and shows the list
        }
      })
      // .catch runs when the request failed: there is no network,
      // or fetchShows threw an error because response.ok was false (for example a 500 from the server).
      .catch(() => {
        if (!isCancelled) {
          setError('Could not load shows. Check your connection and try again.')
        }
      })
      // .finally runs in BOTH cases, success or failure, so the loading message always goes away.
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false)
        }
      })

    // Cleanup: React calls this function when the component leaves the screen.
    // In development, StrictMode runs every effect twice to find bugs, and this also cancels the first run.
    return () => {
      isCancelled = true
    }
  }, []) // [] = no dependencies, so the effect runs only once, when the component first appears

  // Whoever calls useShows() gets these 3 values: const { shows, isLoading, error } = useShows()
  return { shows, isLoading, error }
}
