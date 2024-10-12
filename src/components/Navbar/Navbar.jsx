import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
      <div>
        <nav className="navbar">

                    <div>
                        <b id="nm">Des<span id="nm2">tina</span></b>
                    </div>
           
    <div className='nav-links'>
      
            <li><Link to="/customerhome">Home</Link></li>
            <li><Link to="/mybooking">My Bookings</Link></li>
            <li><Link to="/packages">Packages</Link></li>
            <li><Link to="/customerpayment">Payments</Link></li>
                        
    </div>


    <div className='logout' onClick={()=>{
      {localStorage.removeItem('authToken')}
    }}>
          <Link to="/login">LogOut</Link>
    </div>

      </nav>
    </div>
    );
  }
  
  export default Navbar;


