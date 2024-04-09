// import {Component} from 'react'
import { useState , useEffect } from "react"
import { useParams } from 'react-router-dom';

import {BsDot} from 'react-icons/bs'

import Header from '../Header'
import CastCrewDetails from '../CastCrewDetails'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SingleMovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState([])
  const [genres, setGenres] = useState([])
  const [spokenLanguage, setSpokenLanguage] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const getMovieDetails = async () => {
      setApiStatus(apiStatusConstants.inProgress)
  
      const apiKey = '7232196b484463d86c0a78349527cfd8'
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  
      const options = {
        method: 'GET',
      }
  
      const response = await fetch(apiUrl, options)
  
      if (response.ok) {
        const data = await response.json()
        // console.log(data)
  
        const updatedData = {
          id: data.id,
          adult: data.adult,
          backdropPath: data.backdrop_path,
          posterPath: data.poster_path,
          budget: data.budget,
          homePage: data.homepage,
          imdbId: data.imdb_id,
          originalLanguage: data.original_language,
          originalTitle: data.original_title,
          title: data.title,
          overview: data.overview,
          popularity: data.popularity,
          releaseDate: data.release_date,
          revenue: data.revenue,
          runTime: data.runtime,
          status: data.status,
          tagLine: data.tagline,
          ratingAvg: data.vote_average,
          ratingCount: data.vote_count,
        }
  
        const genreData = data.genres.map(each => ({
          id: each.id,
          name: each.name,
        }))
  
        const spokenLanguageData = data.spoken_languages.map(each => ({
          englishName: each.english_name,
          iso: each.iso_639_1,
          name: each.name,
        }))
  
        setMovieDetails(updatedData)
        setGenres(genreData)
        setSpokenLanguage(spokenLanguageData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getMovieDetails()
  }, [id])
  

  const renderSinglePagePoster = () => {
    const {
      backdropPath,
      title,
      releaseDate,
      posterPath,
      adult,
      overview,
      runTime,
      tagLine,
      status,
      budget,
      revenue,
    } = movieDetails
    const year = new Date(releaseDate).getFullYear()
    const hours = Math.floor(runTime / 60)
    const minutes = runTime % 60
    const movieStatus = status === 'Released'
    const movieImage = posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'

    const formattedBudget = budget.toLocaleString()
    const formattedRevenue = revenue.toLocaleString()

    return (
      <>
        <div
          className=""
          alt={title}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdropPath})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100%',
          }}
        >
          <div className="movie-poster-container">
            <div className="movie-poster-responsive">
              <img
                src={movieImage}
                alt=""
                className="single-movie-poster-img"
              />
              <div className="single-poster-details-container">
                <h1 className="single-poster-title">
                  {title} <span className="span-year">({year})</span>
                </h1>
                <p className="single-poster-tagline">{tagLine}</p>
                <ul className="single-poster-list">
                  <li className="single-poster-rated">{adult ? 'A' : 'U/A'}</li>
                  <li className="single-poster-runtime">
                    <BsDot /> {releaseDate}
                  </li>
                  {movieStatus ? (
                    <li className="single-poster-runtime">
                      <BsDot /> {`${hours}h ${minutes}m`}
                    </li>
                  ) : (
                    <li className="single-poster-runtime">
                      <BsDot /> {status}
                    </li>
                  )}
                </ul>
                <div className="single-poster-genres-container">
                  <p className="single-poster-genres">Genres: </p>
                  <ul className="single-poster-genres-list">
                    {genres.map(eachGenre => (
                      <li
                        key={eachGenre.id}
                        className="single-poster-genres-item"
                      >
                        {eachGenre.name},
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="single-poster-genres-container">
                  <p className="single-poster-genres">Languages: </p>
                  <ul className="single-poster-genres-list">
                    {spokenLanguage.map(eachLan => (
                      <li
                        key={eachLan.iso}
                        className="single-poster-genres-item"
                      >
                        {eachLan.name} ({eachLan.englishName}),
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="single-poster-genres-container">
                  <p className="single-poster-genres">Budget: </p>
                  <span className="single-poster-genres-item">
                    $ {formattedBudget}
                  </span>
                </div>
                <div className="single-poster-genres-container">
                  <p className="single-poster-genres">Revenue: </p>
                  <span className="single-poster-genres-item">
                    $ {formattedRevenue}
                  </span>
                </div>
                <p className="single-poster-overview">
                  <span className="span-overview">Overview:</span> {overview}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CastCrewDetails castDetails={movieDetails} />
      </>
    )
  }

  const renderFailureView = () => (
    <div className="failure-container">
      <FailureView retry={this.getMovieDetails} />
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container">
      <LoaderView />
    </div>
  )

  const renderSinglePage = () => {

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSinglePagePoster()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  
    return (
      <>
        <Header />
        <div className="single-movie-container">{renderSinglePage()}</div>
      </>
    )
  
}

export default SingleMovieDetails