import type { Show } from './types/show'
import sampleShows from './data/sample-shows.json'
import HomePage from './pages/HomePage/HomePage'

// משימה 1: המידע מגיע מקובץ מקומי. במשימה 3 השורה הזו תוחלף ב-useShows()
const shows: Show[] = sampleShows

const App = () => {
  return <HomePage shows={shows} />//i passing props there is pop driling 
}

export default App