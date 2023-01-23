const SignUpForm = ({
  handleSubmit,
  handleNewEmailChange,
  handleNewPasswordChange,
  handleNewNameChange,
  newEmail,
  newPassword,
  newName
 }) => {
 return (
   <div className="sign-up-form add-form--form">
     <h2 className="align-center">Sign Up</h2>
     <form onSubmit={handleSubmit} className="add-form--form">
     <ul>
     <li>
       <div>
         <label htmlFor="Email">Email</label>
         <input
           value={newEmail}
           onChange={handleNewEmailChange}
           placeholder="Email"
           name="Email"
           type="text"
         />
       </div>
       </li>
       <li>
       <div>
         <label htmlFor="Name">Name</label>
         <input
           value={newName}
           onChange={handleNewNameChange}
           placeholder="Name"
           name="Name"
           type="email"
         />
       </div>
       </li>
       <li>
       <div>
         <label htmlFor="Password">Password</label>
         <input
           type="password"
           value={newPassword}
           onChange={handleNewPasswordChange}
           placeholder="Password"
           name="Password"
         />
         </div>
         </li>
      </ul>
     <div className="align-center">
       <button type="submit">Sign Up</button>
    </div>
     </form>
   </div>
 )
}

export default SignUpForm
