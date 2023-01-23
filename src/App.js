import React, {useEffect, useState} from 'react';
import Notification from './Notification.js';
import Header from './Header.js';
import Nav from './Nav.js';
import MobileNav from './MobileNav.js';
import Aside from './Aside.js';
import Footer from './Footer.js';
// import DetailedCard from './DetailedCard.js';
import AddForm from './AddForm.js';
import Section from './Section'
import Togglable from './Togglable';
import LogInForm from './LogInForm';
import ProfileCard from './ProfileCard';
import coupleService from './services/couples';
import loginService from './services/login'
import signupService from './services/signup'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom"

const App = () => {
  // mis States (o hooks?)
  // const [popUp, setPopUp] = useState(false);
  const [isAddFormOn, setIsAddFormOn] = useState(false);
  const [isLogInFormOn, setIsLogInFormOn] = useState(false);
  const [isProfileCardOn, setIsProfileCardOn] = useState(false);
  // const [display, setDisplay] = useState(0);
  const [activeView, setActiveView] = useState(0)
  // const [tvCouples, setTvCouples] = useState([]);
  // const [movieCouples, setMovieCouples] = useState([]);
  // const [couples, setCouples] = useState([])
  const [coupleType, setCoupleType] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)
  const breakpoint = 620;

  console.log("render")
  console.log("is mobile", isMobile)

  // mobile responsiveness
  const handleResize = () => {
    console.log("handleResize called")
    setWindowWidth(window.innerWidth)
    if (window.innerWidth >= breakpoint) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }

  useEffect(() => {
    console.log("app use effect called (for adding event listener)")
    window.addEventListener('resize', handleResize)
    if (window.innerWidth >= breakpoint) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }

    return () => {
      console.log("event listener removed")
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  // handle clicks

    //handle clicks for add form
    const handleFormClick = () => {
      setIsAddFormOn(isAddFormOn => !isAddFormOn)
    }

  // updates state of couples after new couple has been posted to server
  const updateSetCouples = (newThingy) => {
    const newCouple = newThingy;
    setCouples(couples.concat(newCouple));
  }

// defines what types of couple to show
  const modifyCoupleType = (newCoupleType) => {
    setCoupleType(newCoupleType)
  }

  // navbar

  const updateView = (nbr) => {
    setActiveView(nbr);
  }

  //login

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        email, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      coupleService.setToken(user.token)
      setUser(user)
      setEmail('')
      setPassword('')
      setIsLogInFormOn(false)
    } catch (exception) {
      console.log("data error " + exception.response.data.error)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      coupleService.setToken(user.token)
    }
  }, [])

  const handleSignUp = async (event) => {
    let email = newEmail;
    let name = newName;
    let password = newPassword;
    event.preventDefault()
    console.log('signing up with in with', email, password)
    try {
      const user = await signupService.signup({
        email, name, password,
      })
      console.log("trying signing up")
      setNewName('')
      setNewEmail('')
      setNewPassword('')
      setIsLogInFormOn(false)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogInClick = () => {
    if (user === null) {
      setIsLogInFormOn(isLogInFormOn => !isLogInFormOn)
    } else {
      setIsProfileCardOn(isProfileCardOn => !isProfileCardOn)
      console.log("abrir profile card")
    }

    console.log("isLogInFormOn activado desde app.js")
  }

  const handleProfileCardClick = () => {
    setIsProfileCardOn (isProfileCardOn => !isProfileCardOn)
    console.log("isProfileCardOn activado desde app.js")
  }

  return (
    <div>
      <BrowserRouter>
      <div className="AppLanding">

        <Notification message={errorMessage} />
        {isMobile ? <div></div>: <Header />}
        {isMobile ? <MobileNav
          updateView={updateView}
          activeView={activeView}
          handleFormClick={handleFormClick}
          handleLogInClick={handleLogInClick}
          user={user}
          modifyCoupleType={modifyCoupleType}
          /> :
        <Nav
          updateView={updateView}
          activeView={activeView}
          handleFormClick={handleFormClick}
          handleLogInClick={handleLogInClick}
          user={user}
          modifyCoupleType={modifyCoupleType}
        />}
        <Aside modifyCoupleType={modifyCoupleType}/>
        {isAddFormOn && <AddForm handleFormClick={handleFormClick} updateSetCouples={updateSetCouples} user={user} setIsAddFormFalse={() => setIsAddFormOn(false)}/>}
        {isLogInFormOn && <LogInForm
          email={email}
          password={password}
          handleEmailChange={({ target }) => setEmail(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          newEmail={newEmail}
          newPassword={newPassword}
          newName={newName}
          handleNewEmailChange={({ target }) => setNewEmail(target.value)}
          handleNewPasswordChange={({ target }) => setNewPassword(target.value)}
          handleNewNameChange={({ target }) => setNewName(target.value)}
          handleSubmit={handleLogin}
          handleLogInClick={handleLogInClick}
          handleSignUp={handleSignUp}
          errorMessage={errorMessage}
        />}

        {isProfileCardOn && <ProfileCard
          user={user}
          handleProfileCardClick={handleProfileCardClick} />
        }
        <Switch>
          <Route path="/movies">
          <div className="section-wrapper">
            <Section className="Section" modifyCoupleType={modifyCoupleType} initialCoupleType={'/movies'} coupleType={coupleType} activeView={activeView} user={user}  />
          </div>
          </Route>
          <Route path="/tv-shows">
          <div className="section-wrapper">
            <Section className="Section" modifyCoupleType={modifyCoupleType} initialCoupleType={'/tv-shows'} coupleType={coupleType} activeView={activeView}  user={user} />
          </div>
          </Route>
          <Route path="/">
          <div className="section-wrapper">
            <Section className="Section" initialCoupleType={''} coupleType={coupleType} activeView={activeView} user={user} />
          </div>
          </Route>
        </Switch>

        <Footer />

      </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
