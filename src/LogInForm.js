import React from 'react';
import Togglable from './Togglable'
import SignUpForm from './SignUpForm'
import Notification from './Notification'

const LogInForm = ({
   handleSubmit,
   handleEmailChange,
   handlePasswordChange,
   email,
   password,
   handleLogInClick,
   newEmail,
   newPassword,
   newName,
   handleNewEmailChange,
   handleNewPasswordChange,
   handleNewNameChange,
   handleSignUp,
   errorMessage
  }) => {


  return (
  <div className="add-form login-form">
    <div className="add-form--form" id="log-in-form">
    <form onSubmit={handleSubmit} className="log-in-form--form">
      <span className="exit-form" onClick={handleLogInClick}>&times;</span><br/>
      <ul>
      <li className="">
      <div>
      <label htmlFor="Email">Email</label>
          <input
          type="email"
          value={email}
          name="Email"
          onChange={handleEmailChange}
          placeholder="Email"
        />
      </div></li>
      <li className="">
      <div>
      <label htmlFor="Password">Password</label>
          <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          placeholder="Password"
        />
      </div></li>
      </ul>
      <div className="align-center">
        <button className="boton" type="submit"> Log in</button>
      </div>
    </form>
    <Notification message={errorMessage} />
    <hr/>
    <Togglable buttonLabel='Sign Up' className="align-center boton">
      <SignUpForm
       newEmail={newEmail}
       newPassword={newPassword}
       newName={newName}
       handleNewEmailChange={handleNewEmailChange}
       handleNewPasswordChange={handleNewPasswordChange}
       handleNewNameChange={handleNewNameChange}
       handleSubmit={handleSignUp}
      />
      <Notification message={errorMessage} />
    </Togglable>

    </div>
  </div>
)
}

export default LogInForm
