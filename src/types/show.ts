// סדרה כפי שהיא מגיעה מ-TVmaze (רק השדות שאנחנו משתמשים בהם)
export interface Show {
  id: number
  name: string
  genres: string[]
  rating: { average: number | null }
  image: { medium: string; original: string } | null
  summary: string | null
  premiered: string | null
  status: string
  language: string | null
  schedule: { time: string; days: string[] }
}
