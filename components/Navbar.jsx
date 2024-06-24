import React from 'react';
import Link from 'next/link';
import './Navbarr.css'; // Import local CSS module for styling
const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="logo">
          <Link href="/" className="companyName">
            DSAce.IO
          </Link>
        </div>
        <div className="navLinks">
          <Link href="https://www.linkedin.com/in/amon-sharma-ab8a15216/" className='navLink'>
            LinkedIn
          </Link>
          <Link href="https://github.com/Amon20044" className='navLink'>
            GitHub
          </Link>
        </div>
      </nav>
    );
  };

export default Navbar;
