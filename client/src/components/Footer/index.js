import React from 'react';
import "./style.css";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-row row">
          <div className="links-div col s6">
            <a className="links-div-anchor" href="https://www.linkedin.com/in/thomas-haigh-5960b81aa/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin font-awesome social-icon"></i>
            </a>
            <a className="links-div-anchor" href="https://github.com/Conanas" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github font-awesome social-icon"></i>
            </a>
          </div>
          <div className="contact-div col s6">
            <label>tmhaigh@gmail.com</label>
            <label>Melbourne, Victoria, Australia</label>
          </div>
        </div>
      </div>
    </footer>
  )
}
