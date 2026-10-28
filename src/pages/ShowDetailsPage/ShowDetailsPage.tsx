// ShowDetailsPage (/shows/:id): קורא id עם useParams ומשתמש ב-useShow(id)
import { Link, useParams } from 'react-router'
import type { Show } from '../../types/show'
import styles from './ShowDetailsPage.module.css'

interface ShowDetailsPageProps {
  shows: Show[]
}

const ShowDetailsPage = ({ shows }: ShowDetailsPageProps) => {
  const { id } = useParams()
  const show = shows.find((item) => item.id === Number(id))

  if (!show) {
    return (
      <main className={styles.showDetailsPage}>
        <h1 className={styles.title}>Show not found</h1>
        <Link to="/" className={styles.backLink}>
          Back to list
        </Link>
      </main>
    )
  }

  const rating = show.rating.average ?? 'No rating'

  return (
    <main className={styles.showDetailsPage}>
      <Link to="/" className={styles.backLink}>
        Back to list
      </Link>
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
    </main>
  )
}

export default ShowDetailsPage
