import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const AgentNavbar = () => {
  return (
    <div>
      <nav className="navbar">

        <div>
          <b id="nm">Des<span id="nm2">tina</span></b>
        </div>

        <div className='nav-links'>
          <li><Link to="/agenthome">Home</Link></li>
          {/* <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/about-us">About Us</Link></li> */}
          <li><Link to="/agentbookings">Bookings</Link></li>
          <li><Link to="/showreviews">Reviews</Link></li>
          <li><Link to="/packages">Packages</Link></li>
          <li><Link to="/agentpayment">Payments</Link></li>
          <li><Link to="/addpackages">Add Packages</Link></li>
        </div>
        
        <div className='logout' onClick={() => {
          { localStorage.removeItem('authToken') }
        }}>
          <Link to="/login">LogOut</Link>
        </div>

      </nav>
    </div>
  );
}

export default AgentNavbar;