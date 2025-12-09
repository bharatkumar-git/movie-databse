import {useEffect, useState} from 'react'

import './index.css'

const apiStatusConstants = {
  pending: 'pending',
  success: 'success',
  failure: 'failure',
}
const UpcomingMoviesPage = props => {
  const {history} = props

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.pending)
  const [renderList, setRenderList] = useState([])

  useEffect(() => {
    const makeApiCall = async () => {
      const API_KEY = '35474548ccfb894572e10e892cffc0fe'
      const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data)

        if (response.ok) {
          const baseImgUrl = 'https://image.tmdb.org/t/p/w500'
          const wantedList = data.results.map(item => ({
            poster: baseImgUrl + item.poster_path,
            name: item.title,
            rating: item.vote_average,
            id: item.id,
          }))
          // console.log(wantedList)
          setApiStatus(apiStatusConstants.success)
          setRenderList(wantedList)
        } else {
          console.log(data.status_message)
        }
      } catch (error) {
        console.log('Error - ', error)
      }
    }

    makeApiCall()
  }, [])

  const renderApiStatusPendingView = () => <p>Loading ...</p>

  const renderApiStatusSuccessView = () => (
    <ul className="movie-items-ul">
      {renderList.map(item => (
        <li key={item.id} className="movie-items-li">
          <img alt="poster" src={item.poster} />
          <p>{item.name}</p>
          <p>{item.rating}</p>
          <button
            onClick={() => history.push(`/details/${item.id}`)}
            type="button"
          >
            View Details
          </button>
        </li>
      ))}
    </ul>
  )

  const renderPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.pending:
        return renderApiStatusPendingView()
      case apiStatusConstants.success:
        return renderApiStatusSuccessView()
      default:
        return null
    }
  }

  return <div className="content-main-container">{renderPage()}</div>
}

export default UpcomingMoviesPage
