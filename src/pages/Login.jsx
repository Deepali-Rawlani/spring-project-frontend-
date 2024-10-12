import { Label } from 'reactstrap';
import '../../src/styles/loginAs.css';
import Header from '../components/Header/Header';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'CUSTOMER',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const loginDto = {
      email: formData.email,
      password: formData.password,
      role: formData.role.toUpperCase(),
    };
    console.log(loginDto);
    try {
      const response = await axios.post('http://localhost:8082/api/user/login', loginDto);
      const data = response.data;
      console.log(data);

      if (data.token) {
        console.log("Token received:", data.token);
        
        // Store token and userId in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.userId);
        
        alert('Successfully logged in!');

        const role = formData.role.toLowerCase();
        console.log("Navigating to:", role);

        // Navigate based on role
        if (role === "customer") {
          navigate(`/customerhome/${data.userId}`);
        } else if (role === "admin") {
          navigate('/adminhome');
        } else if (role === "agent") {
          navigate('/agenthome');
        }
      } else if (data === 'Account is unapproved' || data === 'Account is Blocked') {
        setErrorMessage(data);
      } else if (data === 'not found') {
        setErrorMessage('User not found.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('User Not exist.');
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
          <h2>Login</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <form ref={form} onSubmit={handleSubmit}>
            <Label className='text-start'>Email ID :</Label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}

            <Label className='text-start'>Password :</Label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <Label className='text-start'>Login As :</Label>
            <select name="role" onChange={handleChange} className='form-control'>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="AGENT">AGENT</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button type="submit">Login</button>
          </form>
          <button className="btn" onClick={() => navigate('/signup')}>
            Signup
          </button>
          <a  onClick={() => navigate('/forgetpassword')}>
            Forget Password?
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;