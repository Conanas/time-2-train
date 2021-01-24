import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../utils/UserContext';
import './style.css';

export default function Navbar() {
  const [userState, dispatchUser] = useUserContext();

  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo right">Workout Time</Link>
          <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="left hide-on-med-and-down">
            <li><Link className="nav-item" to="/">Start/Edit Workout</Link></li>
            <li><Link className="nav-item" to="/create">Create Workout</Link></li>
            <li><Link className="nav-item" to="/load">Load Workout</Link></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Start/Edit Workout</Link></li>
        <li><Link to="/create">Create Workout</Link></li>
        <li><Link to="/load">Load Workout</Link></li>
      </ul>
    </>
  )
}