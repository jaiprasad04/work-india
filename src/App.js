import {Routes, Navigate, Route} from 'react-router-dom'

import Account from './components/Account'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SingleMovieDetails from './components/SingleMovieDetails'
import SearchMovies from './components/SearchMovies'
import NotFound from './components/NotFound'


import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/account" element={<Account />} />
      <Route path="/" element={<Popular />} />
      <Route path="/top-rated" element={<TopRated />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/search" element={<SearchMovies />} />
      <Route path="/movie/:id" element={<SingleMovieDetails />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  )
}
export default App;
