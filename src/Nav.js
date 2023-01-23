import React from 'react';
// import coupleService from './services/couples';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"

function Nav(props) {

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

  const loggedIn = () => (
      <span><strong>{user.name}</strong> logged in</span>
  )

  const notLoggedIn = () => (
    <span>Log in/Sign up</span>
  )

  return (
    <nav className="Nav">
    {/* forceRefresh={true} */}
    <Router>
      <ul>
        <li className={globalClass} onClick={getAllCouples}>
            <Link to="/"><span id="globalNavWord"> Global </span> </Link>
        </li>
        <li className={tvClass} onClick={getTvShows}>
          <Link to="/tv-shows"><span id="globalNavTv">TV Shows</span></Link>
        </li>
        <li className={movieClass} onClick={getMovies}>
          <Link to="/movies"><span id="globalNavMovies">Movies</span></Link>
        </li>
        <li id="displayAddOn" onClick={props.handleFormClick}>
          Add
        </li>
        <li id="displayLogInForm" onClick={props.handleLogInClick}>
          {user === null ? notLoggedIn() : loggedIn()}
        </li>
      </ul>
      </Router>
    </nav>
  );
}

export default Nav;
