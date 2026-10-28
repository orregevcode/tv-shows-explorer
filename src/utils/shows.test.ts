// בדיקות Vitest ל-utils/shows.ts. המידע לבדיקה: 5 הסדרות מ-data/sample-shows.json
// Vikings, Fargo, Death Note, Supernatural, Glee
import { describe, expect, it } from 'vitest'
import type { Show } from '../types/show'
import sampleShows from '../data/sample-shows.json'
import {
  ALL_GENRES,
  averageRating,
  countByGenre,
  filterShows,
  getGenres,
  stripHtml,
  toggleId,
  topRated,
} from './shows'

const shows: Show[] = sampleShows

// סדרה בלי דירוג, כדי לבדוק שהפונקציות מתעלמות מ-null
const unratedShow: Show = { ...sampleShows[0], id: 999, name: 'No Rating Show', rating: { average: null } }

const getNames = (list: Show[]) => list.map((show) => show.name)

describe('filterShows', () => {
  it('returns every show when the search is empty and no genre is picked', () => {
    expect(filterShows(shows, '', ALL_GENRES)).toHaveLength(5)
  })

  it('matches names without caring about upper or lower case or extra spaces', () => {
    expect(getNames(filterShows(shows, '  DEATH ', ALL_GENRES))).toEqual(['Death Note'])
  })

  it('keeps only shows that have the picked genre', () => {
    expect(getNames(filterShows(shows, '', 'Action'))).toEqual(['Vikings', 'Supernatural'])
  })

  it('combines the search text with the genre', () => {
    // "e" נמצא ב-Death Note, Supernatural ו-Glee, אבל Death Note הוא לא Drama
    expect(getNames(filterShows(shows, 'e', 'Drama'))).toEqual(['Supernatural', 'Glee'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterShows(shows, 'zzz', ALL_GENRES)).toEqual([])
  })
})

describe('getGenres', () => {
  it('lists every genre once, sorted A to Z', () => {
    expect(getGenres(shows)).toEqual([
      'Action',
      'Anime',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'History',
      'Music',
      'Romance',
      'Supernatural',
      'Thriller',
    ])
  })
})

describe('stripHtml', () => {
  it('removes HTML tags and keeps the text', () => {
    expect(stripHtml('<p><b>Lost</b> is a <i>great</i> show.</p>')).toBe('Lost is a great show.')
  })

  it('returns an empty string when there is no summary', () => {
    expect(stripHtml(null)).toBe('')
  })
})

describe('countByGenre', () => {
  it('counts how many shows are in each genre', () => {
    const counts = countByGenre(shows)
    expect(counts.Drama).toBe(4)
    expect(counts.Action).toBe(2)
    expect(counts.Anime).toBe(1)
  })
})

describe('averageRating', () => {
  it('returns the average rounded to one decimal', () => {
    // (8.6 + 8.6 + 8.8 + 8.4 + 6.6) / 5 = 8.2
    expect(averageRating(shows)).toBe(8.2)
  })

  it('ignores shows without a rating', () => {
    expect(averageRating([...shows, unratedShow])).toBe(8.2)
  })

  it('returns null when no show has a rating', () => {
    expect(averageRating([])).toBeNull()
    expect(averageRating([unratedShow])).toBeNull()
  })
})

describe('topRated', () => {
  it('returns the highest rated shows first', () => {
    expect(getNames(topRated(shows, 3))).toEqual(['Death Note', 'Vikings', 'Fargo'])
  })

  it('skips shows without a rating', () => {
    expect(getNames(topRated([unratedShow, ...shows], 10))).not.toContain('No Rating Show')
  })

  it('does not change the order of the original array', () => {
    const before = getNames(shows)
    topRated(shows, 3)
    expect(getNames(shows)).toEqual(before)
  })
})

describe('toggleId', () => {
  it('adds an id that is not in the list', () => {
    expect(toggleId([1, 2], 3)).toEqual([1, 2, 3])
  })

  it('removes an id that is already in the list', () => {
    expect(toggleId([1, 2, 3], 2)).toEqual([1, 3])
  })

  it('returns a new array and does not change the original', () => {
    const ids = [1, 2]
    const result = toggleId(ids, 3)
    expect(result).not.toBe(ids)
    expect(ids).toEqual([1, 2])
  })
})
