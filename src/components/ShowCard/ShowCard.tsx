import { Link } from 'react-router'
import type { Show } from '../../types/show'
import styles from './ShowCard.module.css'

interface ShowCardProps {
  show: Show
}

const ShowCard = ({ show }: ShowCardProps) => {
  const rating = show.rating.average ?? 'No rating'

  return (
    <article className={styles.showCard}>
      <Link to={`/shows/${show.id}`} className={styles.cardLink}>
        {show.image ? (
          <img className={styles.poster} src={show.image.medium} alt={show.name} />
        ) : (
          <div className={styles.noPoster}>No image</div>
        )}
        <div className={styles.info}>
          <h2 className={styles.title}>{show.name}</h2>
          <p className={styles.rating}>⭐ {rating}</p>
          <p className={styles.genres}>{show.genres.join(' · ')}</p>
        </div>
      </Link>
    </article>
  )
}

export default ShowCard