// FavoriteButton: a heart button that adds a show to the favorites, or removes it.
// It doesn't know anything about favorites itself: it gets isFavorite and onClick from its parent.
import styles from './FavoriteButton.module.css'

interface FavoriteButtonProps {
  isFavorite: boolean
  onClick: () => void
}

// type="button": a plain button (not a form "submit" button).
// aria-label: the button shows only a heart, so this text tells screen readers what it does.
// aria-pressed: tells screen readers whether the button is "on" (a favorite) or "off".
const FavoriteButton = ({ isFavorite, onClick }: FavoriteButtonProps) => {
  const label = isFavorite ? 'Remove from favorites' : 'Add to favorites'

  return (
    <button
      type="button"
      className={isFavorite ? `${styles.favoriteButton} ${styles.isFavorite}` : styles.favoriteButton}
      onClick={onClick}
      aria-pressed={isFavorite}
      aria-label={label}
      title={label}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  )
}

export default FavoriteButton
