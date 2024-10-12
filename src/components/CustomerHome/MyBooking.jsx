import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'reactstrap';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const customerId = localStorage.getItem('userId'); // Fetching the customer ID from local storage

    const navigate = useNavigate();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/booking/customer/${customerId}`);
                console.log("API Response:", response.data); // Log the data to check its structure
                if (Array.isArray(response.data)) {
                    setBookings(response.data);
                } else {
                    throw new Error("No Bookings for this user.");
                }
            } catch (error) {
                console.error("Error fetching bookings", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [customerId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await axios.delete(`http://localhost:8082/api/booking/${bookingId}`);
            if (response.status === 200) {
                alert("Booking Canceled");
                setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
            } else {
                alert("Error cancelling booking");
            }
        } catch (error) {
            console.error("Error cancelling booking", error);
            alert("Error cancelling booking");
        }
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <h2>Your Bookings</h2><br /><br />
                {Array.isArray(bookings) && bookings.length > 0 ? (
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Agent Name</th>
                                {/* <th>Agent Mobile Number</th> */}
                                <th>Agent Email</th>
                                {/* <th>Booking Date</th> */}
                                <th>Payment Status</th>
                                <th>Number of People</th>
                                <th>Total Amount</th>
                                <th>Package Location</th>
                                {/* <th>Package Title</th> */}
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>{booking.bookingId}</td>
                                    <td>{booking.agentFullName}</td>
                                    {/* <td>{booking.agentMobileNumber}</td> */}
                                    <td>{booking.agentEmail}</td>
                                    {/* <td>{new Date(booking.bookingDate).toLocaleDateString()}</td> */}
                                    <td>{booking.bookingStatus}</td>
                                    <td>{booking.numberOfTravelers}</td>
                                    <td>{booking.totalAmount}</td>
                                    <td>{booking.packageLocation}</td>
                                    {/* <td>{booking.packageTitle}</td> */}
                                    <td>{new Date(booking.packageStartDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.packageEndDate).toLocaleDateString()}</td>
                                    <td>
                                        {booking.bookingStatus === "Paid" ? (
                                            <Button onClick={() => handleCancelBooking(booking.bookingId)}>Cancel</Button>
                                        ) : booking.bookingStatus === "Pending" ? (
                                            <>
                                                <Button onClick={() => {
                                                    navigate(`/payment/${booking.bookingId}/${booking.totalAmount}`);
                                                }}>Pay</Button>
                                                <Button onClick={() => handleCancelBooking(booking.bookingId)} >Cancel</Button>
                                            </>
                                        ) : booking.bookingStatus === "Cancelled" ? null : (
                                            <Button onClick={() => {
                                                navigate(`/payment/${booking.bookingId}/${booking.totalAmount}`);
                                            }}>Pay</Button>
                                        )}
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <div>No bookings found.</div>
                )}
            </div>
        </>
    );
};

export default MyBookings;
