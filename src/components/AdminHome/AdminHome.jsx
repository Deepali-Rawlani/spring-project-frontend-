import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal } from 'react-bootstrap';
import Navbar from '../Navbar/AdminNavbar';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/user/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleShow = (user, operationType) => {
    setSelectedUser(user);
    setOperation(operationType);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleAction = async () => {
    if (!selectedUser) return;

    try {
      if (operation === 'block') {
        await axios.put(`http://localhost:8082/api/user/block/${selectedUser.id}`);
      } else if (operation === 'delete') {
        await axios.delete(`http://localhost:8082/api/user/${selectedUser.id}`);
        console.log(selectedUser.id);
        console.log(`Deleting user with id: ${selectedUser.id}`);
      }else if(operation === 'unblock'){
        await axios.put(`http://localhost:8082/api/user/approve/${selectedUser.id}`);
      }
      setShowModal(false);
      fetchUsers(); // Refresh the list of users after the action
    } catch (error) {
      console.error(`Error performing ${operation} action:`, error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='container mt-5'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Account Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.accountStatus}</td>
              <td>
                {user.accountStatus=='BLOCKED'?
                <Button variant="warning" onClick={() => handleShow(user, 'unblock')}>Unblock</Button>
                  :
                  <Button variant="warning" onClick={() => handleShow(user, 'block')}>Block</Button>}
                
                
                
                <Button variant="danger" onClick={() => handleShow(user, 'delete')}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for confirming block or delete */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{operation === 'block' ? 'Block User' :operation=='delete' ? 'Delete User': 'unblock user'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {operation === 'block' ? (
            <p>Are you sure you want to block the user {selectedUser?.firstName} {selectedUser?.lastName}?</p>
          ): operation === 'delete' ? (
            <p>Are you sure you want to delete the user {selectedUser?.firstName} {selectedUser?.lastName}?</p>
          ): (
            <p>Are you sure you want to unblock the user {selectedUser?.firstName} {selectedUser?.lastName}?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant={operation === 'block' ? 'warning' : 'danger'} onClick={handleAction}>
            {operation === 'block' ? 'Block'  : operation === 'delete' ? 'Delete' : 'Unblock'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AdminHome;
