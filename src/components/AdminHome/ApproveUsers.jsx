import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import AdminNavbar from '../Navbar/AdminNavbar';

const ApproveUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/user/unapproved'); // Replace with your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await axios.put(`http://localhost:8082/api/user/approve/${userId}`);
      alert('User approved successfully');
      // Optionally, update the state to reflect the approved user
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Failed to approve user');
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="container mt-5">
      <h2>Pending User Approvals</h2>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {(user.accountStatus === 'UNAPROOVED' || user.accountStatus === 'BLOCKED') && (
                  <Button
                    color="success"
                    onClick={() => handleApprove(user.id)}
                  >
                    Approve
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
};

export default ApproveUsers;
