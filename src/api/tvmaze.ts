// fetchShows(), fetchShow(id): הקריאות ל-TVmaze, ורק הן
import type { Show } from '../types/show'

const API_BASE_URL = 'https://api.tvmaze.com'

export const fetchShows = async (): Promise<Show[]> => {
  const response = await fetch(`${API_BASE_URL}/shows`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

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