// ShowDetailsPage (/shows/:id): one show. It reads the id from the address with useParams,
// and loads the show with useShow(id).
import { Link, useParams } from 'react-router'
import { useShow } from '../../hooks/useShow'
import { formatSchedule, stripHtml } from '../../utils/shows'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import styles from './ShowDetailsPage.module.css'

const ShowDetailsPage = () => {
  // useParams gives back the :id part of the address, always as a string (for example '82'),
  // so I turn it into a number. For /shows/abc, Number('abc') is NaN, and useShow handles that.
  const { id } = useParams()
  const { show, isLoading, error } = useShow(Number(id))

  // 4 states: loading, error, not found, or the data.
  // Each `if` returns early, so the code below it runs only when the show really loaded.
  const renderContent = () => {
    if (isLoading) {
      return <StatusMessage type="loading" message="Loading show..." />
    }
    if (error) {
      return <StatusMessage type="error" message={error} />
    }
    if (!show) {
      return <h1 className={styles.title}>Show not found</h1>
    }

    // ?? means: if the left side is null (or undefined), use the right side instead.
    const rating = show.rating.average ?? 'No rating'
    // "Sunday at 21:00", or null when TVmaze has no airing days for this show
    const schedule = formatSchedule(show.schedule)
    // stripHtml turns "<p><b>Lost</b> is...</p>" into plain text.
    // || (and not ??) because stripHtml gives back an empty string '' when there is no summary,
    // and || also replaces '', while ?? only replaces null and undefined.
    const summary = stripHtml(show.summary) || 'No summary available.'

    // show.image ? A : B shows the poster if there is one, otherwise a "No image" box.
    // Lines like {schedule ? <p>...</p> : null} show a fact only if TVmaze has it.
    return (
      <article className={styles.details}>
        {show.image ? (
          <img className={styles.poster} src={show.image.medium} alt={show.name} />
        ) : (
          <div className={styles.noPoster}>No image</div>
        )}
        <div>
          <h1 className={styles.title}>{show.name}</h1>
          <p className={styles.rating}>⭐ {rating}</p>
          {show.genres.length > 0 ? <p className={styles.meta}>{show.genres.join(' · ')}</p> : null}
          <p className={styles.meta}>
            <span className={styles.label}>Status:</span> {show.status}
          </p>
          {show.premiered ? (
            <p className={styles.meta}>
              <span className={styles.label}>Premiered:</span> {show.premiered}
            </p>
          ) : null}
          {schedule ? (
            <p className={styles.meta}>
              <span className={styles.label}>Airs:</span> {schedule}
            </p>
          ) : null}
          {show.language ? (
            <p className={styles.meta}>
              <span className={styles.label}>Language:</span> {show.language}
            </p>
          ) : null}
          <h2 className={styles.subtitle}>Summary</h2>
          <p className={styles.summary}>{summary}</p>
        </div>
      </article>
    )
  }

  // The "Back to list" link is always there, in every state, so it's outside renderContent.
  return (
    <main className={styles.showDetailsPage}>
      <Link to="/" className={styles.backLink}>
        Back to list
      </Link>
      {renderContent()}
    </main>
  )
}

export default ShowDetailsPage
