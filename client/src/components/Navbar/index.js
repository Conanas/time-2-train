import React from 'react';
import './style.css';

export default function Navbar() {
  return (
    <>
      <nav>
        <div class="nav-wrapper container">
          <a href="#!" class="brand-logo right">Workout Time</a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="left hide-on-med-and-down">
            <li><a className="nav-item" href="/">Start/Edit Timer</a></li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo">
        <li><a href="/">Start/Edit Timer</a></li>
      </ul>
    </>
  )
}