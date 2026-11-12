// StatsPage (/stats): a snapshot of all the shows: the totals, the 5 highest-rated shows,
// and how many shows there are in each genre.
import { Link } from 'react-router'
import type { Show } from '../../types/show'
import { averageRating, getGenreCounts, topRated } from '../../utils/shows'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import styles from './StatsPage.module.css'

// The same 3 values App gets from useShows(), passed down as props
interface StatsPageProps {
  shows: Show[]
  isLoading: boolean
  error: string | null
}

const StatsPage = ({ shows, isLoading, error }: StatsPageProps) => {
  // 3 states on the screen: loading, error, or the data.
  const renderContent = () => {
    if (isLoading) {
      return <StatusMessage type="loading" message="Loading stats..." />
    }
    if (error) {
      return <StatusMessage type="error" message={error} />
    }

    // All the numbers are calculated from shows on every render, with the pure functions from utils.
    // Nothing here is state, because it can always be worked out again from shows.
    const average = averageRating(shows)
    const topShows = topRated(shows, 5)
    const genreCounts = getGenreCounts(shows)
    // The biggest genre gets a full bar (100%), and the others get a bar relative to it
    const maxCount = genreCounts.length > 0 ? genreCounts[0].count : 1

    return (
      <>
        <section className={styles.summary}>
          <div className={styles.tile}>
            <span className={styles.tileValue}>{shows.length}</span>
            <span className={styles.tileLabel}>Shows</span>
          </div>
          <div className={styles.tile}>
            <span className={styles.tileValue}>⭐ {average ?? '–'}</span>
            <span className={styles.tileLabel}>Average rating</span>
          </div>
          <div className={styles.tile}>
            <span className={styles.tileValue}>{genreCounts.length}</span>
            <span className={styles.tileLabel}>Genres</span>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Top 5 rated</h2>
          {/* <ol> is a numbered list. Each name is a Link to that show's details page. */}
          <ol className={styles.topList}>
            {topShows.map((show) => (
              <li key={show.id} className={styles.topItem}>
                <Link to={`/shows/${show.id}`} className={styles.topLink}>
                  {show.name}
                </Link>
                <span className={styles.topRating}>⭐ {show.rating.average}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Shows per genre</h2>
          <ul className={styles.genreList}>
            {genreCounts.map(({ genre, count }) => (
              <li key={genre} className={styles.genreRow}>
                <span className={styles.genreName}>{genre}</span>
                <span className={styles.barTrack}>
                  {/* An inline style, because the width is different for every genre */}
                  <span className={styles.bar} style={{ width: `${(count / maxCount) * 100}%` }} />
                </span>
                <span className={styles.genreCount}>{count}</span>
              </li>
            ))}
          </ul>
        </section>
      </>
    )
  }

  return (
    <main className={styles.statsPage}>
      <h1 className={styles.title}>Stats</h1>
      {renderContent()}
    </main>
  )
}

export default StatsPage
