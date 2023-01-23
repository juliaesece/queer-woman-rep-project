import React from 'react';
import image from "./queer-women-rep.png";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

function Header() {
  return (
    <header className="Header">
    <Router forceRefresh={true}>
      <Link to="/">
      <img src={image} id="logo" alt="Queer women rep logo"/>
      </Link>
      <h1 style={{display:"none"}}>Queer Women Rep</h1>
    </Router>
    </header>
  );
}

export default Header;
