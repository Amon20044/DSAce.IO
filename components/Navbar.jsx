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
          <Link href="https://www.linkedin.com/your-linkedin" className='navLink'>
            LinkedIn
          </Link>
          <Link href="https://github.com/your-github" className='navLink'>
            GitHub
          </Link>
        </div>
      </nav>
    );
  };

export default Navbar;
