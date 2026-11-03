// utils/shows.ts: pure logic, with no React inside.
// A pure function gets data and gives back NEW data. It never changes what it got,
// and the same input always gives the same output. That makes it easy to test (see shows.test.ts).
import type { Show } from '../types/show'

// The value of the genre <select> when no genre is picked
export const ALL_GENRES = 'All'

// ---------- List page: search and filter ----------

// Keeps only the shows whose name contains the search text (upper or lower case doesn't matter)
// AND that have the picked genre.
export const filterShows = (shows: Show[], query: string, genre: string): Show[] => {
  // trim() removes spaces at the start and end. toLowerCase() makes "BREAK" and "break" the same.
  const text = query.trim().toLowerCase()

  // filter() keeps only the items for which the function returns true. It returns a NEW array.
  return shows.filter((show) => {
    const matchesName = show.name.toLowerCase().includes(text) // an empty text matches every name
    const matchesGenre = genre === ALL_GENRES || show.genres.includes(genre)
    return matchesName && matchesGenre
  })
}

// Every genre in the list, each one only once, sorted A to Z. Used to build the genre <select>.
export const getGenres = (shows: Show[]): string[] => {
  // A Set keeps every value only once, so adding 'Drama' 100 times still leaves one 'Drama'.
  const genres = new Set<string>()
  shows.forEach((show) => show.genres.forEach((genre) => genres.add(genre)))
  // [...genres] turns the Set back into an array, so it can be sorted.
  return [...genres].sort()
}

// ---------- Details page ----------

// The summary from TVmaze comes with HTML tags, for example "<p><b>Lost</b> is...</p>".
// This removes the tags and keeps only the text.
export const stripHtml = (html: string | null): string => {
  if (html === null) {
    return ''
  }
  // The regular expression /<[^>]*>/g means: "<", then anything that isn't ">", then ">".
  // g = replace every match, not only the first one.
  return html.replace(/<[^>]*>/g, '').trim()
}

// ---------- Stats page ----------

// How many shows there are in each genre, for example { Drama: 120, Comedy: 45 }
export const countByGenre = (shows: Show[]): Record<string, number> => {
  // Record<string, number> = an object whose keys are strings and whose values are numbers
  const counts: Record<string, number> = {}
  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      // ?? 0: the first time a genre appears it isn't in the object yet (undefined), so start from 0
      counts[genre] = (counts[genre] ?? 0) + 1
    })
  })
  return counts
}

// The average rating, rounded to one digit after the dot.
// Shows with no rating (null) are not counted. If no show has a rating, it returns null.
export const averageRating = (shows: Show[]): number | null => {
  const ratings: number[] = []
  shows.forEach((show) => {
    if (show.rating.average !== null) {
      ratings.push(show.rating.average)
    }
  })

  // Without this check, an empty list would divide by 0
  if (ratings.length === 0) {
    return null
  }

  // reduce() adds up all the numbers, starting from 0
  const sum = ratings.reduce((total, rating) => total + rating, 0)
  // * 10, round, / 10 → one digit after the dot (8.24 → 8.2)
  return Math.round((sum / ratings.length) * 10) / 10
}

// The highest-rated shows, from the highest to the lowest.
// filter() returns a new array, so sort() doesn't change the original array.
export const topRated = (shows: Show[], count: number): Show[] => {
  return shows
    .filter((show) => show.rating.average !== null)
    // sort with (a, b) => b - a puts the big numbers first. ?? 0 is only there for TypeScript:
    // the filter above already removed the nulls.
    .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
    .slice(0, count) // keep only the first `count` shows
}

// ---------- Favorites ----------

// If the id is already in the array, take it out. If not, add it.
// It returns a NEW array and doesn't change the old one, because React only notices
// a state change when it gets a new array.
export const toggleId = (ids: number[], id: number): number[] => {
  if (ids.includes(id)) {
    return ids.filter((currentId) => currentId !== id)
  }
  // [...ids, id] = a copy of the old array with the new id at the end
  return [...ids, id]
}
