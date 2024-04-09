import {Component} from 'react'

import {FaFire, FaInstagram, FaLinkedin, FaWhatsapp} from 'react-icons/fa'
import {IoStarHalfOutline} from 'react-icons/io5'
import {BiLineChart} from 'react-icons/bi'
import {MdAccountCircle} from 'react-icons/md'
import {SlUserFollowing} from 'react-icons/sl'

import {Link} from 'react-router-dom'

import './index.css'

class SideBar extends Component {
  state = {currentPath: ''}

  componentDidMount() {
    const path = window.location.pathname
    this.setState({currentPath: path})
  }

  render() {
    const {currentPath} = this.state
    const popularClassName = currentPath === '/' && 'selected-item'
    const topRatedClassName = currentPath === '/top-rated' && 'selected-item'
    const upcomingClassName = currentPath === '/upcoming' && 'selected-item'
    const accountClassName = currentPath === '/account' && 'selected-item'

    return (
      <div className="sidebar-container">
        <ul className="menu-category-list">
          <Link to="/" className="nav-link">
            <li className={`menu-category-item ${popularClassName}`}>
              <FaFire className="icons" /> Popular
            </li>
          </Link>
          <Link to="/top-rated" className="nav-link">
            <li className={`menu-category-item ${topRatedClassName}`}>
              <IoStarHalfOutline className="icons" /> TopRated
            </li>
          </Link>
          <Link to="/upcoming" className="nav-link">
            <li className={`menu-category-item ${upcomingClassName}`}>
              <BiLineChart className="icons" /> Upcoming
            </li>
          </Link>
          <Link to="/account" className="nav-link">
            <li className={`menu-category-item ${accountClassName}`}>
              <MdAccountCircle className="icons" /> Account
            </li>
          </Link>
        </ul>
        <div className="follow">
          <details>
            <summary className="follow-container">
              <SlUserFollowing color="#009dff" className="icons" /> Contact Me
            </summary>
            <div className="accounts">
              <a href="https://wa.me/qr/D5VVRGRIFYSHB1" label="whatsapp">
                <FaWhatsapp color="#ffffff" size={22} className="icon" />
              </a>
              <a
                href="https://www.instagram.com/i_am_sorry_pretty_girl___?igsh=MTJmMWpyeWFnaTcwNQ=="
                label="instagram"
              >
                <FaInstagram color="#ffffff" size={22} className="icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/jayaprasadkavuru"
                label="linkedin"
              >
                <FaLinkedin color="#ffffff" size={22} className="icon" />
              </a>
            </div>
          </details>
        </div>
      </div>
    )
  }
}

export default SideBar