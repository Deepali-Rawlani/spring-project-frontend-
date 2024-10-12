import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import AdminNavbar from '../Navbar/AdminNavbar';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    const fetchRecord = async() =>{
        const response = await axios.get('http://localhost:8082/api/notifications');
        const data = response.data;
        console.log(data);
        setNotifications(data);

    }

    useEffect(() => {
        try{
            fetchRecord();
        }catch(error ) {
                     console.error("There was an error fetching the notifications!", error);
        }
    }, []);

    return (
        <>
        <AdminNavbar/>
        <div className="container mt-5">
            <h2>Notifications</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Subject</th>
                        <th>From</th>
                        <th>Customer</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <tr key={notification.notificationId || index}>
                                <td>{index + 1}</td>
                                <td>{notification.subject}</td>
                                <td>{notification.fromName}</td>
                                <td>{notification.customerName}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No notifications found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        </>
    );
}

export default Notifications;
