import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminNavbar = () => {
    return (
      <div>
        <nav className="navbar">

                    <div>
                        <b id="nm">Des<span id="nm2">tina</span></b>
                    </div>
           
    <div className='nav-links'>
      
            <li><Link to="/adminhome">Home</Link></li>
            {/* <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/about-us">About Us</Link></li>  */}
            <li><Link to="/approveuser">Requests</Link></li>
            <li><Link to="/notification">Notifications</Link></li>
                        
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
  
  export default AdminNavbar;