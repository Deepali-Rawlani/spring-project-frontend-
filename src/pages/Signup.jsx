import { Label } from 'reactstrap';
import '../../src/styles/loginAs.css';
import Header from '../components/Header/Header';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    address: '',
    role: 'CUSTOMER',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const form = useRef();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstname = 'First name must contain only letters.';
    }

    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastname = 'Last name must contain only letters.';
    }

    if (!/^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, and a number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const { id, ...validFormData } = formData;
      axios.post('http://localhost:8082/api/user/register', formData)
        .then((response) => {
          setMessage("User created successfully!");
          console.log(response.data);

          // Redirect to login after successful signup
          navigate('/login');
        })
        .catch((error) => {
          console.error("Error:", error);
          setMessage("Failed to create user. Please try again.");
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <video src="https://cdn.pixabay.com/video/2024/07/09/220296_tiny.mp4" muted autoPlay loop type="video/mp4" id="video"></video>
      </div>
      <div className="containerC">
        <div className="customer-auth">
          <h2>Signup</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form ref={form} onSubmit={handleSubmit}>

            <Label className='text-start'>First Name :</Label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              onChange={handleChange}
              required
            />
            {errors.firstname && <p className="error">{errors.firstname}</p>}

            <Label className='text-start'>Last Name :</Label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              onChange={handleChange}
              required
            />
            {errors.lastname && <p className="error">{errors.lastname}</p>}
            
            <Label className='text-start'>Email :</Label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <Label className='text-start'>Phone :</Label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter Phone"
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <Label className='text-start'>Address :</Label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              onChange={handleChange}
              required
            />

            <Label className='text-start'>Password :</Label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <Label className='text-start'>Login As :</Label>
            <select name="role" onChange={handleChange} className='form-control'>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="AGENT">AGENT</option>
            </select>

            <button type="submit">Signup</button>
          </form>
          <button className="btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;

