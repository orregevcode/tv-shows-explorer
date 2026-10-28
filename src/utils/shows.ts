// לוגיקה טהורה, בלי React: מקבלת מידע ומחזירה מידע חדש, בלי לשנות את מה שקיבלה.
// לכן קל לבדוק אותה עם Vitest (shows.test.ts)
import type { Show } from '../types/show'

// ערך ה-select של הז'אנר כשלא בוחרים ז'אנר מסוים
export const ALL_GENRES = 'All'

// ---------- רשימה: חיפוש וסינון ----------

// רק הסדרות שהשם שלהן מכיל את טקסט החיפוש (בלי הבדל בין אותיות גדולות לקטנות)
// ושיש להן את הז'אנר שנבחר
export const filterShows = (shows: Show[], query: string, genre: string): Show[] => {
  const text = query.trim().toLowerCase()

  return shows.filter((show) => {
    const matchesName = show.name.toLowerCase().includes(text)
    const matchesGenre = genre === ALL_GENRES || show.genres.includes(genre)
    return matchesName && matchesGenre
  })
}

// כל הז'אנרים ברשימה, בלי כפילויות ולפי סדר א"ב. משמש לבניית ה-select
export const getGenres = (shows: Show[]): string[] => {
  const genres = new Set<string>()
  shows.forEach((show) => show.genres.forEach((genre) => genres.add(genre)))
  return [...genres].sort()
}

// ---------- עמוד פרטים ----------

// התקציר מ-TVmaze מגיע עם תגיות HTML, למשל "<p><b>Lost</b> is...</p>"
export const stripHtml = (html: string | null): string => {
  if (html === null) {
    return ''
  }
  return html.replace(/<[^>]*>/g, '').trim()
}

// ---------- עמוד סטטיסטיקות ----------

// כמה סדרות יש בכל ז'אנר. למשל: { Drama: 120, Comedy: 45 }
export const countByGenre = (shows: Show[]): Record<string, number> => {
  const counts: Record<string, number> = {}
  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      counts[genre] = (counts[genre] ?? 0) + 1
    })
  })
  return counts
}

// הדירוג הממוצע, מעוגל לספרה אחת אחרי הנקודה.
// סדרות בלי דירוג (null) לא נספרות. אם אין אף סדרה עם דירוג, מחזירה null
export const averageRating = (shows: Show[]): number | null => {
  const ratings: number[] = []
  shows.forEach((show) => {
    if (show.rating.average !== null) {
      ratings.push(show.rating.average)
    }
  })

  if (ratings.length === 0) {
    return null
  }

  const sum = ratings.reduce((total, rating) => total + rating, 0)
  return Math.round((sum / ratings.length) * 10) / 10
}

// הסדרות עם הדירוג הגבוה ביותר, מהגבוה לנמוך.
// filter מחזיר מערך חדש, ולכן sort לא משנה את המערך המקורי
export const topRated = (shows: Show[], count: number): Show[] => {
  return shows
    .filter((show) => show.rating.average !== null)
    .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
    .slice(0, count)
}

// ---------- מועדפים ----------

// אם ה-id כבר במערך, מוציאים אותו. אם לא, מוסיפים.
// מחזירה מערך חדש ולא משנה את הישן, כמו ש-React מצפה מ-state
export const toggleId = (ids: number[], id: number): number[] => {
  if (ids.includes(id)) {
    return ids.filter((currentId) => currentId !== id)
  }
  return [...ids, id]
}
