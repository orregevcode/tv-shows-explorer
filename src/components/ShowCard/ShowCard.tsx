// ShowCard: one card in the list: poster, name, rating and genres.
// Clicking it opens that show's details page.
import { Link } from 'react-router'
import type { Show } from '../../types/show'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import styles from './ShowCard.module.css'

// The props: the parent (ShowList) passes one show, whether it's a favorite,
// and the function to call when the heart is clicked.
interface ShowCardProps {
  show: Show
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

const ShowCard = ({ show, isFavorite, onToggleFavorite }: ShowCardProps) => {
  // ?? 'No rating': if average is null, show this text instead of a number.
  const rating = show.rating.average ?? 'No rating'

  // Link builds the address from the id, for example /shows/82, and opens it without reloading the page.
  // The Link is INSIDE the <article>, not around it, so the favorite button can sit next to it
  // (a button inside a link is not valid HTML, and clicking the heart would also open the page).
  // The heart sits on top of the poster's corner (position: absolute in the CSS).
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
      <div className={styles.favorite}>
        <FavoriteButton isFavorite={isFavorite} onClick={() => onToggleFavorite(show.id)} />
      </div>
    </article>
  )
}

export default ShowCard