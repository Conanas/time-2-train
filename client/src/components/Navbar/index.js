import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../utils/UserContext';
import GoogleLogin from '../GoogleButtons/GoogleLogin';
import GoogleLogout from '../GoogleButtons/GoogleLogout';
import './style.css';

export default function Navbar() {
  const [userState, dispatchUser] = useUserContext();
  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo right">Time-2-Train</Link>
          <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="left hide-on-med-and-down">
            <li><Link className="nav-item" to="/">Home</Link></li>
            <li><Link className="nav-item" to="/timer">Timer</Link></li>
            <li><Link className="nav-item" to="/create">Create Workout</Link></li>
            <li><Link className="nav-item" to="/load">Load Workout</Link></li>
            <li>{userState.email === null ? <GoogleLogin /> : <GoogleLogout />}</li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/create">Create Workout</Link></li>
        <li><Link to="/load">Load Workout</Link></li>
        <li>{userState.email === null ? <GoogleLogin /> : <GoogleLogout />}</li>
      </ul>
    </>
  )
}