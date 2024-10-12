import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert } from 'reactstrap';
import AgentNavbar from '../Navbar/AgentNavbar';

const ShowReview = () => {
    const [reviews, setReviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/review');
                console.log(response.data);
                setReviews(response.data);
            } catch (error) {
                setErrorMessage('Error fetching reviews. Please try again.');
                console.error('There was an error fetching the reviews!', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <>
        <AgentNavbar/>
        <div className="container mt-5">
            <h2>Reviews</h2>
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        {/* <th>Post Time</th> */}
                        
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Content</th>
                        <th>Package ID</th>
                        <th>Package Title</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={review.reviewId}>
                            <th scope="row">{index + 1}</th>
                            {/* <td>{new Date(review.PostTime).toLocaleString()}</td> */}
                            {/* <td>{review.postDate}</td> */}
                            
                            <td>{review.customerId}</td>
                            <td>{review.customerName}</td>
                            <td>{review.content}</td>
                            <td>{review.packageId}</td>
                            <td>{review.packageTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>
    );
};

export default ShowReview;
