// ShowDetailsPage (/shows/:id): one show. It reads the id from the address with useParams,
// and loads the show with useShow(id).
import { Link, useParams } from 'react-router'
import { useShow } from '../../hooks/useShow'
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

    // show.image ? A : B shows the poster if there is one, otherwise a "No image" box.
    // show.premiered ? ... : null shows the date only if TVmaze has one.
    return (
      <>
        <h1 className={styles.title}>{show.name}</h1>
        {show.image ? (
          <img className={styles.poster} src={show.image.medium} alt={show.name} />
        ) : (
          <div className={styles.noPoster}>No image</div>
        )}
        <p className={styles.meta}>⭐ {rating}</p>
        <p className={styles.meta}>{show.genres.join(' · ')}</p>
        {show.premiered ? <p className={styles.meta}>Premiered {show.premiered}</p> : null}
        <p className={styles.meta}>{show.status}</p>
      </>
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
