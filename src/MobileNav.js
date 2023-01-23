import React, {useState}  from 'react';
// import coupleService from './services/couples';
// import image from ;
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"

function MobileNav(props) {
  const [menuVisibility, setMenuVisibility] = useState('hidden')

  const activeView = props.activeView;
  var movieClass = "";
  var tvClass = "";
  var globalClass = "";
  if (activeView === 2) {
    movieClass = "Active"
  } else if (activeView === 1) {
    tvClass = "Active"
  } else if (activeView === 0) {
    globalClass = "Active"
  }

  const user = props.user;

  // navigator

  const getAllCouples = () => {
    props.modifyCoupleType('')
    props.updateView(0)
  }

const getMovies = () => {
    props.modifyCoupleType('/movies')
    props.updateView(2)
  }


  const getTvShows = () => {
    props.modifyCoupleType('/tv-shows')
    props.updateView(1)
  }

  const showMenu = () => {
    console.log("show menu")
    if (menuVisibility == 'hidden') {
      setMenuVisibility('show')
      console.log("menuVisibility; ", menuVisibility)
    } else {
      setMenuVisibility('hidden')
      console.log("menuVisibility; ", menuVisibility)
    }
  }

  const loggedIn = () => (
      <span onClick={props.handleLogInClick} className="logged-in underline"><strong>{user.name}</strong> logged in</span>
  )

  const notLoggedIn = () => (
    <li id="displayAddOn" className="navitem underline">
      <a className="login-a" onClick={props.handleLogInClick}>
        <img src="./letterboxd-login.svg" className="icon" id="login-icon" alt="Login"/>
      </a>
    </li>
  )

  return (
    <nav className="BigNav">
      <Router>
        <ul className="mainnav">
          <li className="logo">
            <Link to="/">
              <img src="./logo192.png"  alt="Queer women rep logo"/>
            </Link>
          </li>
          {user === null ? notLoggedIn() : loggedIn()}
          <li className="underline">
            <a className="login-a" onClick={showMenu}>
            {menuVisibility == 'hidden' ?
            <img src="./hamburger-icon.svg"  className="icon" id="hamburger-icon" alt="Menu icno "/> :
            <img src="./letterboxd-cruz.svg"  className="icon close" id="crux-icon" alt="Menu icno "/>}

            </a>
          </li>
        </ul>

        <ul className={menuVisibility}>
            <li className={globalClass} onClick={getAllCouples}>
                <Link to="/"><span id="globalNavWord"> Show all</span> </Link>
            </li>
            <li className={tvClass} onClick={getTvShows}>
              <Link to="/tv-shows"><span id="globalNavTv">Show TV Shows</span></Link>
            </li>
            <li className={movieClass} onClick={getMovies}>
              <Link to="/movies"><span id="globalNavMovies">Show Movies</span></Link>
            </li>
            <li id="displayAddOn" onClick={props.handleFormClick}>
              <span>Add to the database</span>
            </li>
        </ul>
        </Router>
      </nav>
  );
}

export default MobileNav;
