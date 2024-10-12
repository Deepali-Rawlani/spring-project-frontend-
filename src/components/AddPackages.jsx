import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    pricePerPerson: '',
    numberOfSeatsAvailable: '',
    agentId: '',
  });
  const [imageFile, setImageFile] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch agent ID from local storage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setFormData((prevState) => ({
        ...prevState,
        agentId: storedUserId, // Set agentId from local storage
      }));
    }
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const formatDateForRequest = (date) => {
    const dt = new Date(date);
    return dt.toISOString().split('.')[0]; // Format as 'yyyy-MM-ddTHH:mm:ss'
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedStartDate = formatDateForRequest(formData.startDate);
    const formattedEndDate = formatDateForRequest(formData.endDate);

    console.log(formData);

    const data = new FormData();
    // Append each form field to the FormData object
    data.append('package', new Blob([JSON.stringify({
      ...formData,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    })], { type: 'application/json' }));
    // Append the file
    if (imageFile) {
      data.append('imageFile', imageFile);
    }
    console.log(data);
    
    try {
      console.log(data);
      const response = await axios.post('http://localhost:8082/api/package', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Package created successfully!');
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        pricePerPerson: '',
        numberOfSeatsAvailable: '',
        agentId: formData.agentId,
      });
      setImageFile(null);
    } catch (error) {
      console.error('Error creating package:', error);
      alert('Failed to create package');
    }
  };
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create Package</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="form-control"
            value={formData.startDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pricePerPerson" className="form-label">Price Per Person</label>
          <input
            type="number"
            id="pricePerPerson"
            name="pricePerPerson"
            className="form-control"
            value={formData.pricePerPerson}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numberOfSeatsAvailable" className="form-label">Number of Seats Available</label>
          <input
            type="number"
            id="numberOfSeatsAvailable"
            name="numberOfSeatsAvailable"
            className="form-control"
            value={formData.numberOfSeatsAvailable}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="agentId" className="form-label">Agent ID</label>
          <input
            type="text"
            id="agentId"
            name="agentId"
            className="form-control"
            value={formData.agentId}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageFile" className="form-label">Image File</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Package</button>
      </form>
    </div>
  );
};

export default AddPackage;
