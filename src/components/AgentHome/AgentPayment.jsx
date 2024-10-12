import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import AgentNavbar from '../Navbar/AgentNavbar';

const AgentPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const agentId = localStorage.getItem('userId');

    if (agentId) {
      axios
        .get(`http://localhost:8082/api/payment/agent/${agentId}`)
        .then((response) => {
          setPayments(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching payment details.');
          setLoading(false);
        });
    } else {
      setError('Customer ID not found in local storage.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <AgentNavbar/>
    <div className="container mt-5">
      <h2>Payment Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.paymentId}>
                <td>{payment.paymentId}</td>
                <td>{payment.bookingId}</td>
                <td>{payment.amountPaid}</td>
                
                <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td>{payment.paymentStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No payments found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
    </>
  );
};

export default AgentPayment;
