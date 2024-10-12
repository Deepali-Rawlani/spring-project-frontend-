import './CustomerHome.css';
import Navbar from '../Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

function CustomerHome() {
  const { customerId } = localStorage.getItem('userId');
  const { cid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      console.log(cid);
      try {
        const response = await axios.get(`http://localhost:8082/api/user/${cid}`);
        setUser(response.data);
        console.log();
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          mobileNumber: response.data.mobileNumber,
          address: response.data.address,
        });
      } catch (error) {
        setErrorMessage('Failed to fetch user information.');
      }
    };
    fetchUser();
  }, [customerId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {

    const updatedUser = {
      id: user.id, 
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      address: formData.address,
      role: user.role, 
      accountStatus: user.accountStatus, 
      password: user.password, 
      createdOn: user.createdOn 
    };

    try {
      await axios.put(`http://localhost:8082/api/user/${customerId}`, updatedUser);
      setUser({ ...user, ...formData });
      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Failed to update user information.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>User Profile</h2><br/>
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

      {!isEditing ? (
        <div>
          <p><strong>Customer ID:</strong> {user.id}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
          
          <Button color="primary" onClick={handleEditClick}>Edit</Button>
        </div>
      ) : (
        <Form>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="mobileNumber">Mobile Number</Label>
            <Input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button color="success" onClick={handleSaveClick}>Save</Button>{' '}<br/><br/>
          <Button color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
        </Form>
      )}
    </div>
    </>
  );
}

export default CustomerHome;
