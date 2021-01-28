import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Navbar() {
  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo right">Time-2-Train</Link>
          <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="left hide-on-med-and-down">
            <li><Link className="nav-item" to="/create">Create Workout</Link></li>
            <li><Link className="nav-item" to="/load">Load Workout</Link></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/create">Create Workout</Link></li>
        <li><Link to="/load">Load Workout</Link></li>
      </ul>
    </>
  )
}