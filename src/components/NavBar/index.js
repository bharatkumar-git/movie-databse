import {useState} from 'react'
import {withRouter} from 'react-router-dom'

import './index.css'

const NavBar = props => {
  const {history} = props

  const [userInput, setUserInput] = useState('')

  return (
    <div className="navbar-main-container">
      <h2>movieDB</h2>
      <div className="flex-gap-4-container">
        <input
          type="text"
          onChange={event => setUserInput(event.target.value)}
          value={userInput}
        />
        <button
          onClick={() => history.push(`/search-results/${userInput}`)}
          type="button"
        >
          Search
        </button>
      </div>
      <nav>
        <ul className="flex-gap-4-container navbar-ul">
          <li>
            <button onClick={() => history.push('/')} type="button">
              Popular
            </button>
          </li>
          <li>
            <button onClick={() => history.push('/top-rated')} type="button">
              Top Rated
            </button>
          </li>
          <li>
            <button onClick={() => history.push('/upcoming')} type="button">
              Upcoming
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withRouter(NavBar)
