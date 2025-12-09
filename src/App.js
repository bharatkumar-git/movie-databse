import {Switch, Route} from 'react-router-dom'

import NavBar from './components/NavBar'
import PopularMoviesPage from './components/PopularMoviesPage'
import MovieDetailsPage from './components/MovieDetailsPage'
import TopRatedMoviesPage from './components/TopRatedMoviesPage'
import UpcomingMoviesPage from './components/UpcomingMoviesPage'
import SearchResultsPage from './components/SearchResultsPage'

import './App.css'

// write your code here

// <NotFound />

const App = () => (
  <div className="app-main-container">
    <NavBar />
    <Switch>
      <Route exact path="/" component={PopularMoviesPage} />
      <Route exact path="/top-rated" component={TopRatedMoviesPage} />
      <Route exact path="/upcoming" component={UpcomingMoviesPage} />
      <Route exact path="/search-results/:text" component={SearchResultsPage} />
      <Route exact path="/details/:id" component={MovieDetailsPage} />
    </Switch>
  </div>
)

export default App
