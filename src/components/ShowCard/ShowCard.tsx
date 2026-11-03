// ShowCard: one card in the list: poster, name, rating and genres.
// Clicking it opens that show's details page.
import { Link } from 'react-router'
import type { Show } from '../../types/show'
import styles from './ShowCard.module.css'

// The props: the parent (ShowList) passes one show.
interface ShowCardProps {
  show: Show
}

const ShowCard = ({ show }: ShowCardProps) => {
  // ?? 'No rating': if average is null, show this text instead of a number.
  const rating = show.rating.average ?? 'No rating'

  // Link builds the address from the id, for example /shows/82, and opens it without reloading the page.
  // The Link is INSIDE the <article>, not around it. That way, in task 7, a favorite button
  // can sit next to it (a button inside a link is not valid HTML).
  // show.image ? A : B: some shows have no poster (image is null), so they get a "No image" box.
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