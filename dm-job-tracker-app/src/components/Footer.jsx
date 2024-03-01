import React from 'react'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import linktreeIcon from '../img/linktree_logo_icon_247832.ico'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          {/* Existing social media icons */}
          <a
            href="https://www.linkedin.com/in/david-mould-b6731a21a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/DMould123"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/DM12_51"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a href="your-linktree-url" target="_blank" rel="noopener noreferrer">
            <img
              src={linktreeIcon}
              alt="Linktree"
              className="social-icon"
              style={{ width: '24px', height: '24px' }}
            />{' '}
          </a>
        </div>
        <div className="copyright">
          <p>David Mould 2024 ©</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
