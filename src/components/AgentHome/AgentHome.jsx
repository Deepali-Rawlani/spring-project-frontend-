// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, Button, CardTitle, CardText, CardImg, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import AddPackage from '../AddPackages';
// import Navbar from '../Navbar/AgentNavbar';

// const AgentHome = () => {
//   const [packages, setPackages] = useState([]);
//   const [editModal, setEditModal] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//     pricePerPerson: '',
//     numberOfSeatsAvailable: '',
//     agentId: '',
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const navigate = useNavigate();
//   const agentId = localStorage.getItem('userId'); // Fetch the agent's ID from local storage


//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const formatDateForRequest = (date) => {
//     const dt = new Date(date);
//     return dt.toISOString().split('.')[0]; // Format as 'yyyy-MM-ddTHH:mm:ss'
//   };

//   useEffect(() => {
//     fetchAgentPackages();
//   }, []);

//   const fetchAgentPackages = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8082/api/package/agent/${agentId}`);
//       if (Array.isArray(response.data)) {
//         setPackages(response.data);
//       } else {
//         console.error('Unexpected data format:', response.data);
//         setPackages([]);
//       }
//     } catch (error) {
//       console.error('Error fetching packages:', error);
//       setPackages([]); // Handle error case
//     }
//   };

//   const deletePackage = async (packageId) => {
//     try {
//       await axios.delete(`http://localhost:8082/api/package/${packageId}`);
//       alert('Package Deleted!');
//       fetchAgentPackages(); // Refresh the packages list after deletion
//     } catch (error) {
//       console.error('Error deleting package:', error);
//     }
//   };

//   const editPackage = (pkg) => {
//     setCurrentPackage(pkg);
//     setEditModal(true); // Open the modal
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleUpdatePackage = async () => {

//     const formattedStartDate = formatDateForRequest(formData.startDate);
//     const formattedEndDate = formatDateForRequest(formData.endDate);

//     const formData = new FormData();
//     formData.append('title', currentPackage.title);
//     formData.append('description', currentPackage.description);
//     formData.append('location', currentPackage.location);
//     formData.append('startDate', formattedStartDate);
//     formData.append('endDate', formattedEndDate);
//     formData.append('pricePerPerson', currentPackage.pricePerPerson);
//     formData.append('numberOfSeatsAvailable', currentPackage.numberOfSeatsAvailable);
//     formData.append('agentId', agentId);

//     // Append the image file if provided
//     if (currentPackage.imageFile) {
//       formData.append('imageFile', currentPackage.imageFile);
//     }

//     try {
//       const response = await axios.put(`http://localhost:8082/api/package/${currentPackage.packageId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log(response.data);
//       alert('Package Updated Successfully!');
//       setEditModal(false); // Close the modal
//       fetchAgentPackages(); // Refresh the packages list after updating
//     } catch (error) {
//       console.error('Error updating package:', error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h2>Your Packages</h2>
//         <div className="row">
//           {Array.isArray(packages) && packages.length > 0 ? (
//             packages.map((pkg) => (
//               <div className="col-md-4 mb-4" key={pkg.packageId}>
//                 <Card>
//                   <CardImg
//                     top
//                     width="100%"
//                     src={`data:image/jpeg;base64,${pkg.image}`} // Handle image display
//                     alt="Package Image"
//                   />
//                   <Card body>
//                     <CardTitle tag="h5">{pkg.title}</CardTitle>
//                     <CardText>
//                       <p className="card-text"><strong>Start Date:</strong> {pkg.startDate}</p>
//                       <p className="card-text"><strong>End Date:</strong> {pkg.endDate}</p>
//                       <p className="card-text"><strong>Price per Person:</strong> {pkg.pricePerPerson.toFixed(2)} Rs.</p>
//                       <p className="card-text"><strong>Seats Available:</strong> {pkg.numberOfSeatsAvailable}</p>
//                       <p className="card-text"><strong>Agent:</strong> {pkg.agentName}</p>
//                       <small className="text-muted">Location: {pkg.location}</small>
//                     </CardText>
//                     <Button color="primary" onClick={() => editPackage(pkg)}>
//                       Edit
//                     </Button>
//                     <Button color="danger" className="ml-2" onClick={() => deletePackage(pkg.packageId)}>
//                       Delete
//                     </Button>
//                   </Card>
//                 </Card>
//               </div>
//             ))
//           ) : (
//             <p>No packages found.</p>
//           )}
//         </div>
//         {/* <AddPackage /> */}
//       </div>

//       {/* Edit Package Modal */}
//       {currentPackage && (
//         <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
//           <ModalHeader toggle={() => setEditModal(false)}>Edit Package</ModalHeader>
//           <ModalBody>
//             <Form>
//               <FormGroup>
//                 <Label for="title">Title</Label>
//                 <Input
//                   type="text"
//                   name="title"
//                   id="title"
//                   value={currentPackage.title}
//                   onChange={handleEditInputChange}
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="description">Description</Label>
//                 <Input
//                   type="textarea"
//                   name="description"
//                   id="description"
//                   value={currentPackage.description}
//                   onChange={handleEditInputChange}
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="location">Location</Label>
//                 <Input
//                   type="text"
//                   name="location"
//                   id="location"
//                   value={currentPackage.location}
//                   onChange={handleEditInputChange}
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="startDate">Start Date</Label>
//                 <Input
//                   type="date"
//                   name="startDate"
//                   id="startDate"
//                   value={currentPackage.startDate}
//                   min={new Date().toISOString().split('T')[0]}
//                   onChange={handleEditInputChange}
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="endDate">End Date</Label>
//                 <Input
//                   type="date"
//                   name="endDate"
//                   id="endDate"
//                   min={new Date().toISOString().split('T')[0]}
//                   value={currentPackage.endDate}
//                   onChange={handleEditInputChange}
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="pricePerPerson">Price Per Person</Label>
//                 <Input
//                   type="number"
//                   name="pricePerPerson"
//                   id="pricePerPerson"
//                   value={currentPackage.pricePerPerson}
//                   onChange={handleEditInputChange}
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="numberOfSeatsAvailable">Number of Seats Available</Label>
//                 <Input
//                   type="number"
//                   name="numberOfSeatsAvailable"
//                   id="numberOfSeatsAvailable"
//                   value={currentPackage.numberOfSeatsAvailable}
//                   onChange={handleEditInputChange}
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="imageFile">Image</Label>
//                 <Input
//                   type="file"
//                   name="imageFile"
//                   id="imageFile"
//                   onChange={(e) => setCurrentPackage({
//                     ...currentPackage,
//                     imageFile: e.target.files[0]
//                   })}
//                 />
//               </FormGroup>
//             </Form>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={handleUpdatePackage}>Update</Button>
//             <Button color="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
//           </ModalFooter>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default AgentHome;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, CardTitle, CardText, CardImg, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/AgentNavbar';

const AgentHome = () => {
  const [packages, setPackages] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
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
  const navigate = useNavigate();
  const agentId = localStorage.getItem('userId');
  // Retrieve agentId from localStorage and set it in formData
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setFormData((prevState) => ({
        ...prevState,
        agentId: storedUserId,
      }));
    }
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const formatDateForRequest = (date) => {
    const dt = new Date(date);
    return dt.toISOString().split('.')[0]; // Format as 'yyyy-MM-ddTHH:mm:ss'
  };

  useEffect(() => {
    fetchAgentPackages();
  }, []);

  const fetchAgentPackages = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/package/agent/${agentId}`);
      if (Array.isArray(response.data)) {
        setPackages(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setPackages([]);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]); // Handle error case
    }
  };

  const deletePackage = async (packageId) => {
    try {
      await axios.delete(`http://localhost:8082/api/package/${packageId}`);
      alert('Package Deleted!');
      fetchAgentPackages(); // Refresh the packages list after deletion
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const editPackage = (pkg) => {
    setCurrentPackage(pkg);
    setFormData(pkg); // Load the selected package into formData for editing
    setEditModal(true); // Open the modal
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdatePackage = async (e) => {
    e.preventDefault();

    const formattedStartDate = formatDateForRequest(formData.startDate);
    const formattedEndDate = formatDateForRequest(formData.endDate);

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

    try {
      const response = await axios.put(`http://localhost:8082/api/package/${currentPackage.packageId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Package Updated Successfully!');
      setEditModal(false); // Close the modal
      fetchAgentPackages(); // Refresh the packages list after updating
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Failed to update package');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Your Packages</h2>
        <div className="row">
          {Array.isArray(packages) && packages.length > 0 ? (
            packages.map((pkg) => (
              <div className="col-md-4 mb-4" key={pkg.packageId}>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={`data:image/jpeg;base64,${pkg.image}`} // Handle image display
                    alt="Package Image"
                  />
                  <Card body>
                    <CardTitle tag="h5">{pkg.title}</CardTitle>
                    <CardText>
                      <p className="card-text"><strong>Start Date:</strong> {pkg.startDate}</p>
                      <p className="card-text"><strong>End Date:</strong> {pkg.endDate}</p>
                      <p className="card-text"><strong>Price per Person:</strong> {pkg.pricePerPerson.toFixed(2)} Rs.</p>
                      <p className="card-text"><strong>Seats Available:</strong> {pkg.numberOfSeatsAvailable}</p>
                      <p className="card-text"><strong>Agent:</strong> {pkg.agentName}</p>
                      <small className="text-muted">Location: {pkg.location}</small>
                    </CardText>
                    <Button color="primary" onClick={() => editPackage(pkg)}>
                      Edit
                    </Button>
                    <Button color="danger" className="ml-2" onClick={() => deletePackage(pkg.packageId)}>
                      Delete
                    </Button>
                  </Card>
                </Card>
              </div>
            ))
          ) : (
            <p>No packages found.</p>
          )}
        </div>
      </div>

      {/* Edit Package Modal */}
      {currentPackage && (
        <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
          <ModalHeader toggle={() => setEditModal(false)}>Edit Package</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleUpdatePackage}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleEditInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleEditInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleEditInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="startDate">Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleEditInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="endDate">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.endDate}
                  onChange={handleEditInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="pricePerPerson">Price Per Person</Label>
                <Input
                  type="number"
                  name="pricePerPerson"
                  id="pricePerPerson"
                  value={formData.pricePerPerson}
                  onChange={handleEditInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="numberOfSeatsAvailable">Number of Seats Available</Label>
                <Input
                  type="number"
                  name="numberOfSeatsAvailable"
                  id="numberOfSeatsAvailable"
                  value={formData.numberOfSeatsAvailable}
                  onChange={handleEditInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="imageFile">Image</Label>
                <Input
                  type="file"
                  name="imageFile"
                  id="imageFile"
                  onChange={handleFileChange}
                />
              </FormGroup>
              <Button color="primary" type="submit">Update</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default AgentHome;
