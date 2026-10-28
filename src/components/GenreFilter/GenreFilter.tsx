// GenreFilter: select של ז'אנרים. מקבל genres, value ו-onChange ב-props
import { ALL_GENRES } from '../../utils/shows'
import styles from './GenreFilter.module.css'

interface GenreFilterProps {
  genres: string[]
  value: string
  onChange: (genre: string) => void
}

const GenreFilter = ({ genres, value, onChange }: GenreFilterProps) => {
  return (
    <label className={styles.genreFilter}>
      <span className={styles.label}>Genre</span>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value={ALL_GENRES}>All genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </label>
  )
}

export default GenreFilter
