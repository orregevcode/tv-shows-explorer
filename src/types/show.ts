// The Show type: what one show looks like when it comes from TVmaze.
// TVmaze sends many more fields. This type describes only the ones the app uses.
// TypeScript checks this while I write code. It does not check the real data when the app runs.
// `| null` means the API can send null for that field, so the code must handle it (for example ?? 'No rating').
export interface Show {
  id: number // unique for every show: used as the key in lists and in the address /shows/:id
  name: string
  genres: string[] // for example ['Drama', 'Crime']
  rating: { average: number | null } // some shows have no rating yet
  image: { medium: string; original: string } | null // the poster in two sizes, or null if there is none
  summary: string | null // HTML text, for example '<p>...</p>'. stripHtml() removes the tags
  premiered: string | null // the first air date, for example '2008-01-20'
  status: string // for example 'Ended' or 'Running'
  language: string | null
  schedule: { time: string; days: string[] } // when it airs, for example days: ['Sunday']
}
