import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Navbar() {
  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo right">Toby Time</Link>
          <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="left hide-on-med-and-down">
            <li><Link className="nav-item" to="/">Home</Link></li>
            <li><Link className="nav-item" to="/timer">Timer</Link></li>
            <li><Link className="nav-item" to="/create">Create Workout</Link></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/create">Create Workout</Link></li>
      </ul>
    </>
  )
}