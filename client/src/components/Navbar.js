// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
        <li>
          <Link to="/myNfts">My NFTs</Link>
        </li>
        {/* <li>
          <Link to="/marketplace">Marketplace</Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
