// useFavorites(): the list of favorite show ids, saved in the browser's localStorage
// so the favorites are still there after a refresh. Returns { favoriteIds, toggleFavorite }.
// App calls it once and passes the result down to the pages, like useShows.
import { useEffect, useState } from 'react'
import { toggleId } from '../utils/shows'

// The name the list is saved under in localStorage.
// The app name in front keeps it apart from other apps that also run on localhost.
const FAVORITES_STORAGE_KEY = 'tv-shows-explorer:favorites'

// Reads the saved ids. localStorage only stores text, so the array is saved as JSON text.
// If nothing is saved, or the text is broken, it starts with an empty list.
const loadFavorites = (): number[] => {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (saved === null) {
      return []
    }
    // unknown, not any: I don't trust what's in localStorage until I check it
    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) {
      return []
    }
    // Keep only real numbers. `item is number` tells TypeScript that the result is number[].
    return parsed.filter((item): item is number => typeof item === 'number')
  } catch {
    // JSON.parse throws on broken text, and localStorage can throw when the browser blocks it
    return []
  }
}

export const useFavorites = () => {
  // Passing the FUNCTION loadFavorites (not calling it) to useState:
  // React runs it only on the first render, so localStorage is read once, not on every render.
  const [favoriteIds, setFavoriteIds] = useState<number[]>(loadFavorites)

  // Every time favoriteIds changes, save it.
  // localStorage is outside React, so writing to it is a side effect, and it goes in useEffect.
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // Saving can fail (for example when storage is blocked). The app keeps working without it.
    }
  }, [favoriteIds])

  // Adds the id if it isn't a favorite yet, and removes it if it is.
  // setFavoriteIds((currentIds) => ...) always gets the newest list, even after very fast clicks.
  const toggleFavorite = (id: number) => {
    setFavoriteIds((currentIds) => toggleId(currentIds, id))
  }

  return { favoriteIds, toggleFavorite }
}
