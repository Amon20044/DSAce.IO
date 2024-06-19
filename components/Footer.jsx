import React from 'react';
import Link from 'next/link';
import './Footerr.css'; // Import local CSS module for styling

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footerContent">
          <p>© 2024 Your Company. All rights reserved.</p>
          <div className="footerLinks">
            <Link href="https://www.linkedin.com/your-linkedin" className="footerLink">
              LinkedIn
            </Link>
            <Link href="https://github.com/your-github" className="footerLink">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;
