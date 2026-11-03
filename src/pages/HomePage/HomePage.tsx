// HomePage (/): the list of all the shows, with a search box and a genre filter.
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
  // Only this page uses the search text and the genre, so their state lives here and not in App.
  // (State goes in the lowest component that needs it.)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState(ALL_GENRES)

  // These are NOT state: they are worked out again on every render from shows, query and genre.
  // If they were state too, they could get out of sync with the real data.
  const genres = getGenres(shows)
  const filteredShows = filterShows(shows, query, genre)

  // 3 states on the screen: loading, error, or the data.
  const renderContent = () => {
    if (isLoading) {
      return <StatusMessage type="loading" message="Loading shows..." />
    }
    if (error) {
      return <StatusMessage type="error" message={error} />
    }
    // onChange={setQuery}: SearchBar calls setQuery(newText) on every key press →
    // HomePage re-renders → filterShows runs again → ShowList gets the new, shorter list.
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
