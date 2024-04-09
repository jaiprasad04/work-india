import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {videosList} = props
  const {
    posterPath,
    title,
    ratingAverage,
    releaseDate,
    ratingCount,
    popularity,
    originalLanguage,
    adult,
    id,
  } = videosList

  // const roundedRating = Number(ratingAverage.toFixed(2))
  const capitalizeFirstLetter = str =>
    str.charAt(0).toUpperCase() + str.slice(1)
  const capitalizedString = capitalizeFirstLetter(originalLanguage)
  const ratedMovie = adult ? 'A' : 'U/A'

  const movieImage = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'

  return (
    <>
      <li className="card">
        <div className="card-inner">
          <div className="card-face front">
            <img src={movieImage} alt="" className="movie-list-item-img" />
          </div>
          <div className="card-face back">
            <p className="movie-title">{title}</p>
            <ul className="movie-details-list">
              <li className="movie-details">
                Release Date:{' '}
                <span className="movie-detail">
                  {releaseDate ? <>{releaseDate}</> : '-'}
                </span>
              </li>
              <li className="movie-details">
                Rating Count:{' '}
                <span className="movie-detail">{ratingCount}</span>
              </li>
              <li className="movie-details">
                Rating Average:{' '}
                <span className="movie-detail">{ratingAverage}</span>
              </li>
              <li className="movie-details">
                Popularity: <span className="movie-detail">{popularity}</span>
              </li>
              <li className="movie-details">
                Language:{' '}
                <span className="movie-detail">{capitalizedString}</span>
              </li>
              <li className="movie-details">
                Adult: <span className="movie-detail">{ratedMovie}</span>
              </li>
            </ul>
          </div>
        </div>
        <Link to={`/movie/${id}`} className="view-details-link">
          <button className="view-button" type="button">
            View Details
          </button>
        </Link>
      </li>
    </>
  )
}

export default MovieItem