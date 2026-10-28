// HomePage (/): רשימה + חיפוש + סינון לפי ז'אנר. ה-state של query ו-genre נמצא כאן
import { useState } from 'react'
import type { Show } from '../../types/show'
import { ALL_GENRES, filterShows, getGenres } from '../../utils/shows'
import SearchBar from '../../components/SearchBar/SearchBar'
import GenreFilter from '../../components/GenreFilter/GenreFilter'
import ShowList from '../../components/ShowList/ShowList'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import styles from './HomePage.module.css'

interface HomePageProps {
  shows: Show[]
  isLoading: boolean
  error: string | null
}

const HomePage = ({ shows, isLoading, error }: HomePageProps) => {
  // רק העמוד הזה משתמש בחיפוש ובז'אנר, לכן ה-state שלהם כאן ולא ב-App
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState(ALL_GENRES)

  // לא שומרים ב-state: מחשבים מחדש בכל רינדור מתוך shows, query ו-genre
  const genres = getGenres(shows)
  const filteredShows = filterShows(shows, query, genre)

  // שלושה מצבים: טוען, שגיאה, יש מידע
  const renderContent = () => {
    if (isLoading) {
      return <StatusMessage type="loading" message="Loading shows..." />
    }
    if (error) {
      return <StatusMessage type="error" message={error} />
    }
    return (
      <>
        <div className={styles.toolbar}>
          <SearchBar value={query} onChange={setQuery} />
          <GenreFilter genres={genres} value={genre} onChange={setGenre} />
        </div>
        <p className={styles.count}>
          Showing {filteredShows.length} of {shows.length} shows
        </p>
        <ShowList shows={filteredShows} />
      </>
    )
  }

  return (
    <main className={styles.homePage}>
      <h1 className={styles.title}>TV Shows</h1>
      {renderContent()}
    </main>
  )
}

export default HomePage
