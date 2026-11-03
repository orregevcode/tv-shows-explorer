// SearchBar: the search box on the home page. It gets value and onChange in props.
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

// A controlled input: its value comes from the parent's state (HomePage's query),
// and every key press sends the new text back up through onChange.
// So React always knows exactly what is in the box.
// <label> around the input: clicking the word "Search" also focuses the box.
const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <label className={styles.searchBar}>
      <span className={styles.label}>Search</span>
      <input
        className={styles.input}
        type="search"
        placeholder="Search by name..."
        value={value}
        onChange={(event) => onChange(event.target.value)} // event.target.value = the text in the box now
      />
    </label>
  )
}

export default SearchBar
