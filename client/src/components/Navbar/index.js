import React from 'react';
import './style.css';

export default function Navbar() {
  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <a href="/" className="brand-logo right">Workout Time</a>
          <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="left hide-on-med-and-down">
            <li><a className="nav-item" href="/">Start/Edit Timer</a></li>
            <li><a className="nav-item" href="/load">Load Workout</a></li>
            <li><a className="nav-item" href="/login">Login</a></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><a href="/">Start/Edit Timer</a></li>
        <li><a href="/load">Load Workout</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </>
  )
}