import {Component} from 'react'

import Header from '../Header'
import MovieItem from '../MovieItem'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import SideBar from '../SideBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    paginationNumber: 1,
    popularMovieList: [],
    pagesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularDatabase()
  }

  getPopularDatabase = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {paginationNumber} = this.state
    
    const apiKey = '7232196b484463d86c0a78349527cfd8'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${paginationNumber}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      // console.log(data)

      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        adult: eachMovie.adult,
        originalLanguage: eachMovie.original_language,
        backdropPath: eachMovie.backdrop_path,
        posterPath: eachMovie.poster_path,
        overview: eachMovie.overview,
        title: eachMovie.title,
        popularity: eachMovie.popularity,
        releaseDate: eachMovie.release_date,
        ratingAverage: eachMovie.vote_average,
        ratingCount: eachMovie.vote_count,
      }))

      const pageData = {
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      }

      this.setState({
        popularMovieList: updatedData,
        pagesList: pageData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickPrevious = () => {
    const {paginationNumber} = this.state
    if (paginationNumber > 1) {
      this.setState(
        prevState => ({paginationNumber: prevState.paginationNumber - 1}),
        this.getPopularDatabase,
      )
    }
  }

  onClickNext = () => {
    const {paginationNumber, pagesList} = this.state
    if (paginationNumber < pagesList.totalPages) {
      this.setState(
        prevState => ({
          paginationNumber: prevState.paginationNumber + 1,
        }),
        this.getPopularDatabase,
      )
    }
  }

  

  renderLoadingView = () => (
    <div className="loader-container">
      <LoaderView />
    </div>
  )

  renderMovieDetails = () => {
    const {popularMovieList} = this.state

    return (
      <ul className="movie-item-list">
        {popularMovieList.map(eachMovie => (
          <MovieItem key={eachMovie.id} videosList={eachMovie} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => <FailureView retry={this.getPopularDatabase} />

  renderMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {paginationNumber, pagesList} = this.state
    const {totalPages} = pagesList
    localStorage.setItem('popularPageNum', JSON.stringify(paginationNumber))

    return (
      <>
        <Header />
        <div className="sidebar-movies-container">
          <SideBar />
          <div className="home-container">
            <div className="movie-item-container">{this.renderMovies()}</div>
            <div className="pagination-container">
              <button
                type="button"
                onClick={this.onClickPrevious}
                className="pagination-button"
              >
                Prev
              </button>
              <p className="pagination-number">
                Page {paginationNumber} of {totalPages}
              </p>
              <button
                type="button"
                onClick={this.onClickNext}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Popular