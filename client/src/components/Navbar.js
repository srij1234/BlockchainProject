// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import the CSS file

function Navbar({account}) {
  console.log(account);
  
  return (
    <nav style={{ height: '70px', backgroundColor: '#8a2be2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', color: '#fff', marginRight: '40px' }}>POLYNFT</h1>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
          <li style={{ marginRight: '60px', marginLeft: '460px' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}>Home</Link>
          </li>
          <li style={{ marginRight: '60px' }}>
            <Link to="/create" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}>Create</Link>
          </li>
          <li style={{ marginRight: '60px' }}>
            <Link to="/myNfts" style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}>My NFTs</Link>
          </li>
        </ul>
      </div>
      <div style={{ fontSize: '18px', color: '#fff' }}>
        {account ? account : "Guest"}
      </div>
    </nav>

  );
}

export default Navbar;
