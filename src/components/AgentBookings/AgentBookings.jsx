import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import AgentNavbar from '../Navbar/AgentNavbar';

const AgentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const agentId = localStorage.getItem('userId'); // Fetch agent ID from local storage

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/booking/agent/${agentId}`);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        alert(response.data); // If no bookings found, display message
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to fetch bookings');
    }
  };

  return (
    <>
    <AgentNavbar/>
    <div className="container mt-5">
      <h2>Agent's Bookings</h2>
      <br/><br/>
      {bookings.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer Name</th>
              
              <th>Customer Email</th>
              {/* <th>Booking Date</th> */}
              <th>Payment Status</th>
              <th>Number of People</th>
              <th>Total Amount</th>
              <th>Package Title</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.customerFullName}</td>
                
                <td>{booking.customerEmail}</td>
                {/* <td>{new Date(booking.bookingDateTime).toLocaleDateString()}</td> */}
                <td>{booking.bookingStatus}</td>
                <td>{booking.numberOfTravelers}</td>
                <td>{booking.totalAmount ? `${booking.totalAmount.toFixed(2)} Rs.` : 'N/A'}</td>
                <td>{booking.packageTitle}</td>
                <td>{new Date(booking.packageStartDate).toLocaleDateString()}</td>
                <td>{new Date(booking.packageEndDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
    </>
  );
};

export default AgentBookings;
