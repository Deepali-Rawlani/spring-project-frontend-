import axios from "axios";
import React from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { totalAmount } = useParams("totalAmount");
  //const { totalAmount } = location.state || {};
  const {bookingId} = useParams("bookingId");
const navigate = useNavigate();
const payment = async() =>{
  try{
    const response = await axios.post(`http://localhost:8082/api/payment/pay-for-booking/${bookingId}`);
    console.log(response.data);
    alert(response.data);
    navigate("/mybooking");
  }catch(error){
    alert(error);
    navigate("/mybooking");
  }
  
}

  return (
    <div className="container mt-5">
      <h2>Payment Page</h2>
      <p>Booking Id: {bookingId} </p>
      <p>Total Amount to Pay: {totalAmount} Rs.</p>



      {/* Add payment form or process here */}
      <button className="btn btn-primary mt-4" onClick={payment} >Proceed to Payment</button>
    </div>
  );
};

export default Payment;
