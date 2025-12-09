import {useEffect, useState} from 'react'

import './index.css'

const apiStatusConstants = {
  pending: 'pending',
  success: 'success',
  failure: 'failure',
}
const MovieDetailsPage = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.pending)
  const [detailsObj, setDetailsObj] = useState({})
  const [cast, setCast] = useState([])

  useEffect(() => {
    const makeApiCall = async () => {
      const API_KEY = '35474548ccfb894572e10e892cffc0fe'
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data)

        if (response.ok) {
          const baseImgUrl = 'https://image.tmdb.org/t/p/w500'
          const wantedObj = {
            poster: baseImgUrl + data.poster_path,
            name: data.title,
            rating: data.vote_average,
            duration: data.runtime,
            genre: data.genres,
            releaseDate: data.release_date,
            overview: data.overview,
            id: data.id,
          }
          // console.log(wantedObj)
          setApiStatus(apiStatusConstants.success)
          setDetailsObj(wantedObj)
        } else {
          console.log(data.status_message)
        }
      } catch (error) {
        console.log('Error - ', error)
      }
    }

    makeApiCall()
  }, [id])

  useEffect(() => {
    const makeApiCall = async () => {
      const API_KEY = '35474548ccfb894572e10e892cffc0fe'
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data)

        if (response.ok) {
          const baseImgUrl = 'https://image.tmdb.org/t/p/w500'
          const wantedList = data.cast.map(item => ({
            id: item.cast_id,
            profile: baseImgUrl + item.profile_path,
            originalName: item.original_name,
            characterName: item.character,
          }))
          // console.log(wantedList)
          setApiStatus(apiStatusConstants.success)
          setCast(wantedList)
        } else {
          console.log(data.status_message)
        }
      } catch (error) {
        console.log('Error - ', error)
      }
    }

    makeApiCall()
  }, [id])

  const renderApiStatusPendingView = () => <p>Loading ...</p>

  const renderApiStatusSuccessView = () => {
    const genres = detailsObj.genre?.map(item => item.name).join()
    return (
      <div>
        <div className="movieDetails-movies-section">
          <h3>Movie Details</h3>
          <div className="movieDetails-movie-details-container">
            <img src={detailsObj.poster} alt="poster" />
            <div>
              <p>{detailsObj.name}</p>
              <p>{detailsObj.rating}</p>
              <p>{detailsObj.overview}</p>
              <p>{detailsObj.runtime}</p>
              <p>{detailsObj.releaseDate}</p>
              <p>{genres}</p>
            </div>
          </div>
        </div>

        <div>
          <h3>Cast Details</h3>
          <ul className="movieDetails-cast-details-ul">
            {cast.map(item => (
              <li key={item.id}>
                <img src={item.profile} alt="profile" />
                <p>{item.originalName}</p>
                <p>{item.characterName}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

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
export default MovieDetailsPage
