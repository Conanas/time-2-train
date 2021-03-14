import React from 'react';
import "./style.css";
import tobyFace from '../../assets/images/toby_13.png';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-row row">
          <div className="toby-col col">
            <img className="toby-footer" src={tobyFace} alt='toby' />
          </div>
        </div>
      </div>
    </footer>
  )
}
