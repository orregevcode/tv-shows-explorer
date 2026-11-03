// GenreFilter: the genre menu on the home page. It gets genres, value and onChange in props.
// Like SearchBar, it's controlled: the picked genre lives in HomePage's state.
import { ALL_GENRES } from '../../utils/shows'
import styles from './GenreFilter.module.css'

interface GenreFilterProps {
  genres: string[]
  value: string
  onChange: (genre: string) => void
}

// The first option is "All genres" (ALL_GENRES), then map() adds one <option> per genre.
// key={genre}: every genre name appears only once (getGenres removes duplicates), so it's a safe key.
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
