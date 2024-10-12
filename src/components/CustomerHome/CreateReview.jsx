import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useParams } from 'react-router-dom';


const CreateReview = ({pid}) => {
    const [customerId, setCustomerId] = useState('');
    const [packageId, setPackageId] = useState(pid);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setCustomerId(storedUserId);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const review = {
            customerId,
            packageId,
            content,
            rating
        };
        console.log(review);

        //jwt authentication:
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await axios.post('http://localhost:8082/api/review', review, config);
            setSuccessMessage(response.data);
            console.log(response.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error creating review. Please try again.');
            setSuccessMessage('');
            console.error('There was an error creating the review!', error);
        }
    };

    return (
        <>
        
        <div className="container mt-5">
            <h2>Add your Review</h2>
            {successMessage && <Alert color="success">{successMessage}</Alert>}
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="customerId">Customer ID</Label>
                    <Input
                        type="text"
                        id="customerId"
                        value={customerId}
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="packageId">Package ID</Label>
                    <Input
                        type="text"
                        id="packageId"
                        value={pid}
                        onChange={(e) => setPackageId(e.target.value)}
                        required
                        readOnly
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="content">Review</Label>
                    <Input
                        type="textarea"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="rating">Rating</Label>
                    <Input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        min="1"
                        max="5"
                    />
                </FormGroup>
                <Button color="primary" type="submit">Submit Review</Button>
            </Form>
        </div>
        </>
    );
};

export default CreateReview;
