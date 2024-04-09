import {Component} from 'react'

import {Link} from 'react-router-dom'

import {MdOutlineMenuOpen, MdOutlineClose} from 'react-icons/md'
import {IoSearch} from 'react-icons/io5'

import './index.css'

class Header extends Component {
  state = {showMenu: false, currentPath: '', inputText: '', suggestions: []}

  componentDidMount() {
    const path = window.location.pathname
    this.setState({currentPath: path})
  }

  fetchSuggestions = async () => {
    const {inputText} = this.state
    const apiKey = '7232196b484463d86c0a78349527cfd8'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
      inputText,
    )}`

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        title: eachMovie.title,
      }))

      this.setState({suggestions: updatedData})
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  handleInputChange = event => {
    const inputText = event.target.value
    this.setState({inputText}, () => {
      if (inputText.trim() !== '') {
        this.fetchSuggestions()
      } else {
        this.setState({suggestions: []})
      }
    })
  }

  handleSuggestionClick = suggestion => {
    const {onSearchInput} = this.props
    this.setState({inputText: suggestion, suggestions: []})
    onSearchInput(suggestion)
  }

  onClickShowMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  // onChangeInput = event => {
  //   this.setState({inputText: event.target.value})
  // }

  onClickSearch = () => {
    const {onSearchInput} = this.props
    const {inputText} = this.state

    if (inputText !== '') {
      onSearchInput(inputText)
      this.setState({suggestions: []})
    }
  }

  onEnterSearchInput = event => {
    const {onSearchInput} = this.props
    const {inputText} = this.state
    if (event.key === 'Enter' && inputText !== '') {
      onSearchInput(inputText)
      this.setState({suggestions: []})
    }
  }

  render() {
    const {showMenu, currentPath, inputText, suggestions} = this.state
    const popularClassName = currentPath === '/' && 'active'
    const topRatedClassName = currentPath === '/top-rated' && 'active'
    const upcomingClassName = currentPath === '/upcoming' && 'active'
    const accountClassName = currentPath === '/account' && 'active'
    const searchPath = currentPath === '/search'
    // console.log(suggestions)

    return (
      <>
        <nav className="navbar-header">
          <div className="responsive-navbar">
            <div className="navbar-container">
              <Link to="/" className="nav-link">
                <h1 className="navbar-title">
                  movie<span className="span-element">DB</span>
                </h1>
              </Link>
            </div>
            <div className="navbar-container">
              <div>
                {searchPath ? (
                  <div className="search-container">
                    <input
                      type="search"
                      className="search-input"
                      value={inputText}
                      onChange={this.handleInputChange}
                      onKeyDown={this.onEnterSearchInput}
                      placeholder="Search by Movie Name"
                    />
                    <button
                      type="button"
                      className="search-button"
                      onClick={this.onClickSearch}
                    >
                      Search
                    </button>
                  </div>
                ) : (
                  <Link to="/search" className="nav-link">
                    <button
                      type="button"
                      label="search"
                      className="search-icon"
                    >
                      <IoSearch size={22} />
                    </button>
                  </Link>
                )}
              </div>

              <button
                className="menu-bar"
                type="button"
                onClick={this.onClickShowMenu}
              >
                {showMenu ? (
                  <MdOutlineClose size={22} />
                ) : (
                  <MdOutlineMenuOpen size={22} />
                )}
              </button>
            </div>
          </div>
          {showMenu && (
            <ul className="mini-list">
              <Link to="/" className="nav-link">
                <li className={`mini-list-item ${popularClassName}`}>
                  Popular
                </li>
              </Link>
              <Link to="/top-rated" className="nav-link">
                <li className={`mini-list-item ${topRatedClassName}`}>
                  Top Rated
                </li>
              </Link>
              <Link to="/upcoming" className="nav-link">
                <li className={`mini-list-item ${upcomingClassName}`}>
                  Upcoming
                </li>
              </Link>
              <Link to="/account" className="nav-link">
                <li className={`mini-list-item ${accountClassName}`}>
                  Account
                </li>
              </Link>
            </ul>
          )}
        </nav>
        <div className="suggestions-list-container">
          <div className="responsive-suggestions-container">
            <ul className="suggestions-list">
              {suggestions.slice(0, 10).map(suggestion => (
                <li
                  key={suggestion.id}
                  onClick={() => this.handleSuggestionClick(suggestion.title)}
                  className="suggestions-list-item"
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Header

