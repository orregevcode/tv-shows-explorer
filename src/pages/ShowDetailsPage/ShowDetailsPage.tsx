// ShowDetailsPage (/shows/:id): קורא id עם useParams וטוען את הסדרה עם useShow(id)
import { Link, useParams } from 'react-router'
import { useShow } from '../../hooks/useShow'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import styles from './ShowDetailsPage.module.css'

const ShowDetailsPage = () => {
  // useParams מחזיר מחרוזת, לכן ממירים ל-Number
  const { id } = useParams()
  const { show, isLoading, error } = useShow(Number(id))

  // ארבעה מצבים: טוען, שגיאה, לא נמצא, יש מידע
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

    const rating = show.rating.average ?? 'No rating'

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
