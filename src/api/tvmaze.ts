// api/tvmaze.ts: the business logic for fetching data from TVmaze lives here, and only here.
// Hooks and components never call fetch() directly. They call these two functions.
import type { Show } from '../types/show'

// The start of every TVmaze address. It never changes, so it is a constant (UPPER_SNAKE_CASE).
const API_BASE_URL = 'https://api.tvmaze.com'

// `async` lets me use `await`: wait for the answer before going on to the next line.
// Promise<Show[]> means: "later, this function gives back an array of shows".
export const fetchShows = async (): Promise<Show[]> => {
  const response = await fetch(`${API_BASE_URL}/shows`)
  // fetch() does NOT throw an error on 404 or 500. It only throws when there is no network.
  // So I check response.ok myself (true for status 200–299), and throw an error if it failed.
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  // response.json() turns the JSON text from the server into JavaScript objects.
  return response.json()
}

// Gets one show by its id. Used by useShow on the details page.
// Returns null when the show does not exist (404), so the page can show "Show not found"
// instead of an error message.
export const fetchShow = async (id: number): Promise<Show | null> => {
  const response = await fetch(`${API_BASE_URL}/shows/${id}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}
