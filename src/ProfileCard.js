import React from 'react';

const ProfileCard = ({
   user,
   password,
   handleProfileCardClick
  }) => {

  const logOut = () => {
      window.localStorage.removeItem('loggedNoteappUser')
      console.log("logging out")
      window.location.reload(false)
  }

  return (
  <div className="profile-card  add-form">
    <div className="add-form--form" id="log-in-form">
      <span className="exit-form" onClick={handleProfileCardClick}>&times;</span><br/>
      <p>Hello {user.name}</p> <br/>
      <p>Click <strong><a className="makePointer" onClick={() => logOut()}>here</a></strong> to log out.</p><br/>
    </div>
  </div>
)
}

export default ProfileCard
