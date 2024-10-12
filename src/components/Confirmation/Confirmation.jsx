import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, CardImg, Container, Alert, Button, FormGroup, Input, Label } from 'reactstrap';
import CreateReview from '../CustomerHome/CreateReview';
import Navbar from '../Navbar/Navbar';

const Confirmation = () => {
    const { id } = useParams();  // Retrieve the package ID from the route
    const navigate = useNavigate();
    const [packageData, setPackageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [peopleCount, setPeopleCount] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [customerId, setCustomerId] = useState('');

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/package/${id}`);
                setPackageData(response.data);
            } catch (error) {
                setErrorMessage('Error fetching package details. Please try again.');
                console.error('There was an error fetching the package details!', error);
            }
        };

        fetchPackageDetails();
    }, [id]);

    useEffect(() => {
        if (packageData) {
            setTotalAmount(packageData.pricePerPerson * peopleCount);
        }
    }, [peopleCount, packageData]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setCustomerId(storedUserId);
        }
    }, []);

    const handleConfirmBooking = async () => {
        try {
            const bookingData = {
                packageId: packageData.packageId,
                numberOfTravelers: peopleCount,
                customerId: customerId,  
                agentId: packageData.agentId,
                totalAmount: totalAmount
            };

            await axios.post('http://localhost:8082/api/booking', bookingData);
            // setSuccessMessage('Booking Created Successfully');
            alert('Booking Created Successfully');
            console.log(bookingData);
        } catch (error) {
            setErrorMessage('Failed to create booking. Please try again.');
            console.error('There was an error creating the booking!', error);
        }
    };

    // const handlePayment = () => {
    //     // Pass totalAmount to the payment page
    //     navigate("/payment", { state: { totalAmount } });
    // };

    if (!packageData) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Navbar/>
        <Container className="mt-5">
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <Card>
                <CardImg top width="100%" src={`data:image/jpeg;base64,${packageData.image}`} alt={packageData.title} style={{width:500,height:200}} />
                <CardBody>
                    <CardTitle tag="h5">{packageData.title}</CardTitle>
                    <CardText><strong>Package Id:</strong> {packageData.packageId}</CardText>
                    <CardText><strong>Location:</strong> {packageData.location}</CardText>
                    <CardText><strong>Description:</strong> {packageData.description}</CardText>
                    <CardText><strong>Start Date:</strong> {new Date(packageData.startDate).toLocaleDateString()}</CardText>
                    <CardText><strong>End Date:</strong> {new Date(packageData.endDate).toLocaleDateString()}</CardText>
                    <CardText><strong>Price per Person:</strong> {packageData.pricePerPerson} Rs.</CardText>
                    <CardText><strong>Seats Available:</strong> {packageData.numberOfSeatsAvailable}</CardText>
                    <CardText><strong>Agent:</strong> {packageData.agentName}</CardText>


                    <FormGroup>
                        <Label for="customerId">Customer ID:</Label>
                        <Input
                            type="text"
                            id="customerId"
                            value={customerId}
                            readOnly
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="peopleCount">Number of People:</Label>
                        <Input
                            type="number"
                            id="peopleCount"
                            value={peopleCount}
                            onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                            min="1"
                            className="mb-3"
                        />
                    </FormGroup>



                    <CardText><strong>Total Amount: {totalAmount} Rs.</strong></CardText>

                    <Button color="success" onClick={handleConfirmBooking}>Confirm Booking</Button>
                </CardBody>
            </Card>

            <CreateReview pid={packageData.packageId}/>

        </Container>
        </>
    );
};

export default Confirmation;
