import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import './style.css';

export default function HomePage() {

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
  }, [])

  return (
    <>
      <h4>Welcome to Time-2-Train</h4>
      <div className='welcome-buttons-div'>
        <Link to="/create">
          <button className='welcome-button flow-text'>
            Create Workout
          </button>
        </Link>
        <Link to="/load">
          <button className='welcome-button flow-text'>
            Load Workout
        </button>
        </Link>
      </div>
    </>
  )
}